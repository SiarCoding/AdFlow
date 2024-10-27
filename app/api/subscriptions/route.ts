import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// GET /api/subscriptions - Abonnement-Details abrufen
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        subscriptionPlan: true,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/subscriptions - Neues Abonnement erstellen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { planId, paymentMethodId } = await req.json();

    // Stripe Customer erstellen oder abrufen
    let customer = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    });

    let customerId;
    if (customer.data.length === 0) {
      const newCustomer = await stripe.customers.create({
        email: session.user.email!,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      customerId = newCustomer.id;
    } else {
      customerId = customer.data[0].id;
    }

    // Stripe Subscription erstellen
    const stripeSubscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: planId }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });

    // Subscription in der Datenbank speichern
    const subscription = await prisma.subscription.create({
      data: {
        subscriptionId: stripeSubscription.id,
        stripeUserId: customerId,
        status: stripeSubscription.status,
        planId,
        startDate: new Date(stripeSubscription.current_period_start * 1000),
        endDate: new Date(stripeSubscription.current_period_end * 1000),
        userId: session.user.id,
        email: session.user.email!,
      },
    });

    return NextResponse.json({
      subscription,
      clientSecret: (stripeSubscription.latest_invoice as any).payment_intent.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}