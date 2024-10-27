"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { loadStripe } from '@stripe/stripe-js';

interface SubscriptionButtonProps {
  priceId: string;
}

export function SubscriptionButton({ priceId }: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });

      if (!response.ok) throw new Error('Subscription creation failed');

      const { clientSecret } = await response.json();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.confirmCardPayment(clientSecret);
      if (error) throw error;

      toast({
        title: 'Subscription successful',
        description: 'Your subscription has been activated.',
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscription}
      disabled={loading}
      className="w-full"
    >
      {loading ? 'Processing...' : 'Subscribe Now'}
    </Button>
  );
}