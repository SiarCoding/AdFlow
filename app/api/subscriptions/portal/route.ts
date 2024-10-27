import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      select: { subscription: true }
    });

    if (!user?.subscription) {
      return new NextResponse('No subscription found', { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.subscription,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}