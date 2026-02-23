import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, Category } from '@/backend';
import { useAddProduct, useUpdateProduct } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: Category;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product ? Number(product.price).toString() : '',
      imageUrl: product?.imageUrl || '',
      category: product?.category || Category.sarees,
    },
  });

  const category = watch('category');

  const onSubmit = async (data: FormData) => {
    try {
      const price = parseInt(data.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      if (product) {
        await updateProduct.mutateAsync({
          id: product.id,
          name: data.name,
          description: data.description,
          price,
          imageUrl: data.imageUrl,
          category: data.category,
        });
        toast.success('Product updated successfully');
      } else {
        await addProduct.mutateAsync({
          name: data.name,
          description: data.description,
          price,
          imageUrl: data.imageUrl,
          category: data.category,
        });
        toast.success('Product added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(product ? 'Failed to update product' : 'Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter product description"
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            {...register('price', { required: 'Price is required' })}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={category}
            onValueChange={(value) => setValue('category', value as Category)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Category.sarees}>Sarees</SelectItem>
              <SelectItem value={Category.westernDresses}>Western Dresses</SelectItem>
              <SelectItem value={Category.lehenga}>Lehenga</SelectItem>
              <SelectItem value={Category.jewellery}>Jewellery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL *</Label>
        <Input
          id="imageUrl"
          {...register('imageUrl', { required: 'Image URL is required' })}
          placeholder="Enter image URL"
        />
        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
