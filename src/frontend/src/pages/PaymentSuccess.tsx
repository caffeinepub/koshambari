import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>
          <div className="w-full space-y-3 rounded-lg bg-muted/50 p-4 text-left">
            <p className="text-sm">
              <span className="font-medium">Order confirmation</span> has been sent to your email.
            </p>
            <p className="text-sm">
              Your order will be delivered within <span className="font-medium">5-7 business days</span>.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <Button size="lg" onClick={() => navigate({ to: '/products' })}>
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
