import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from '@tanstack/react-router';
import UpiPayment from '@/components/UpiPayment';
import { Separator } from '@/components/ui/separator';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleProceedToPayment = () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address) {
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    navigate({ to: '/payment-success' });
  };

  const handlePaymentFailure = () => {
    navigate({ to: '/payment-failure' });
  };

  if (!cart || cart.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {!showPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter your complete address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleProceedToPayment}
                  disabled={!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <UpiPayment
              amount={total}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={Number(item.product.id)} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} × {Number(item.quantity)}
                    </span>
                    <span className="font-semibold">
                      ₹{(Number(item.product.price) * Number(item.quantity)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
