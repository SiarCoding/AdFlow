import { stripe } from './stripe';
import { prisma } from './prisma';

export async function createOrRetrieveCustomer(userId: string, email: string) {
  const existingCustomer = await prisma.user.findUnique({
    where: { userId },
    select: { subscription: true }
  });

  if (existingCustomer?.subscription) {
    return existingCustomer.subscription;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId
    }
  });

  await prisma.user.update({
    where: { userId },
    data: { subscription: customer.id }
  });

  return customer.id;
}

export async function createSubscription(userId: string, priceId: string) {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: { subscription: true, email: true }
  });

  if (!user) throw new Error('User not found');

  let customerId = user.subscription;

  if (!customerId) {
    customerId = await createOrRetrieveCustomer(userId, user.email);
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  });

  await prisma.subscription.create({
    data: {
      subscriptionId: subscription.id,
      userId,
      status: subscription.status,
      planId: priceId,
      startDate: new Date(subscription.current_period_start * 1000),
      endDate: new Date(subscription.current_period_end * 1000),
      stripeUserId: customerId,
      email: user.email
    }
  });

  return subscription;
}