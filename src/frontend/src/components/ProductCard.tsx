import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/backend';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const categoryImages: Record<string, string> = {
  sarees: '/assets/generated/product-saree.dim_600x800.png',
  westernDresses: '/assets/generated/product-western.dim_600x800.png',
  lehenga: '/assets/generated/product-jewellery.dim_600x600.png',
  jewellery: '/assets/generated/product-jewellery.dim_600x600.png',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(Number(product.id), 1);
      toast.success('Added to cart!', {
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const imageUrl = product.imageUrl || categoryImages[product.category] || categoryImages.sarees;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = categoryImages[product.category] || categoryImages.sarees;
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif text-lg font-semibold line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="mt-3 font-serif text-xl font-bold text-primary">
          ₹{Number(product.price).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
