import { useState } from 'react';
import { useProducts } from '@/hooks/useQueries';
import { Category } from '@/backend';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Skeleton } from '@/components/ui/skeleton';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: products, isLoading } = useProducts(selectedCategory);

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Our Products</h1>
        <p className="mt-4 text-muted-foreground">
          Browse our exquisite collection of fashion and jewellery
        </p>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={Number(product.id)} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No products available in this category yet.</p>
        </div>
      )}
    </div>
  );
}
