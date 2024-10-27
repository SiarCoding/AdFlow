import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      
      await prisma.subscription.update({
        where: { subscriptionId: subscription.id },
        data: {
          status: subscription.status,
          startDate: new Date(subscription.current_period_start * 1000),
          endDate: new Date(subscription.current_period_end * 1000)
        }
      });
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      
      await prisma.subscription.update({
        where: { subscriptionId: deletedSubscription.id },
        data: { status: 'canceled' }
      });
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      
      await prisma.invoice.create({
        data: {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription as string,
          amountPaid: invoice.amount_paid / 100,
          currency: invoice.currency,
          status: invoice.status,
          email: invoice.customer_email || ''
        }
      });
      break;
  }

  return new NextResponse(null, { status: 200 });
}