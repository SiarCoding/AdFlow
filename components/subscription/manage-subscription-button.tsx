"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/subscriptions/portal', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to create portal session');

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Portal session error:', error);
      toast({
        title: 'Error',
        description: 'Failed to open subscription portal. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="outline"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </Button>
  );
}