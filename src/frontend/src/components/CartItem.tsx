import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/backend';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

const categoryImages: Record<string, string> = {
  sarees: '/assets/generated/product-saree.dim_600x800.png',
  westernDresses: '/assets/generated/product-western.dim_600x800.png',
  goldJewellery: '/assets/generated/product-jewellery.dim_600x600.png',
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isUpdating } = useCart();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(Number(item.product.id), newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(Number(item.product.id));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const imageUrl = item.product.imageUrl || categoryImages[item.product.category] || categoryImages.sarees;
  const itemTotal = Number(item.product.price) * Number(item.quantity);

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
              {item.product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(Number(item.quantity) - 1)}
                disabled={isUpdating || Number(item.quantity) <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-semibold">{Number(item.quantity)}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(Number(item.quantity) + 1)}
                disabled={isUpdating}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-serif text-lg font-bold text-primary">
                ₹{itemTotal.toLocaleString('en-IN')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleRemove}
                disabled={isUpdating}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
