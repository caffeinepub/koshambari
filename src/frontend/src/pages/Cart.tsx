import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, isLoading, total } = useCart();

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="mb-8 font-serif text-3xl font-bold">Shopping Cart</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12">
        <ShoppingBag className="h-24 w-24 text-muted-foreground/50" />
        <h2 className="mt-6 font-serif text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Add some products to get started!</p>
        <Button className="mt-6" onClick={() => navigate({ to: '/products' })}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <CartItem key={Number(item.product.id)} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate({ to: '/checkout' })}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
