import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionButton } from './subscription-button';
import { Check } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

interface SubscriptionCardProps {
  name: string;
  description: string;
  price: string;
  priceId: string;
  features: Feature[];
  popular?: boolean;
}

export function SubscriptionCard({
  name,
  description,
  price,
  priceId,
  features,
  popular
}: SubscriptionCardProps) {
  return (
    <Card className={`w-[300px] ${popular ? 'border-primary' : ''}`}>
      <CardHeader>
        {popular && (
          <div className="px-3 py-1 text-xs text-primary-foreground bg-primary rounded-full w-fit">
            Popular
          </div>
        )}
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className={`h-4 w-4 mr-2 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <SubscriptionButton priceId={priceId} />
      </CardFooter>
    </Card>
  );
}