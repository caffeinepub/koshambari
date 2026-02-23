import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { XCircle } from 'lucide-react';

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold">Payment Failed</h1>
            <p className="text-muted-foreground">
              We couldn't process your payment. Please try again.
            </p>
          </div>
          <div className="w-full space-y-2 rounded-lg bg-muted/50 p-4 text-left text-sm">
            <p className="font-medium">Common reasons for payment failure:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Insufficient balance</li>
              <li>Incorrect UPI ID</li>
              <li>Network issues</li>
              <li>Transaction timeout</li>
            </ul>
          </div>
          <div className="flex w-full flex-col gap-3">
            <Button size="lg" onClick={() => navigate({ to: '/checkout' })}>
              Retry Payment
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/cart' })}>
              Back to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
