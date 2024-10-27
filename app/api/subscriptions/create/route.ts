import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createSubscription } from '@/lib/subscription';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { priceId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const subscription = await createSubscription(userId, priceId);

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}