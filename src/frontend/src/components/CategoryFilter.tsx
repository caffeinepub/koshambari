import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/backend';

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8 flex justify-center">
      <Tabs
        value={selectedCategory || 'all'}
        onValueChange={(value) => onCategoryChange(value === 'all' ? null : value as Category)}
        className="w-full max-w-2xl"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value={Category.sarees}>Sarees</TabsTrigger>
          <TabsTrigger value={Category.westernDresses}>Western Dresses</TabsTrigger>
          <TabsTrigger value={Category.lehenga}>Lehenga</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
