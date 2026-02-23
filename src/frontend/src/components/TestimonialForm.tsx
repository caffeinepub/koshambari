import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Testimonial } from '@/backend';
import { useAddTestimonial, useUpdateTestimonial } from '@/hooks/useTestimonials';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import StarRating from './StarRating';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onSuccess: () => void;
}

interface FormData {
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
}

export default function TestimonialForm({ testimonial, onSuccess }: TestimonialFormProps) {
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      customerName: testimonial?.customerName || '',
      rating: testimonial ? Number(testimonial.rating) : 5,
      reviewText: testimonial?.reviewText || '',
      date: testimonial?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: FormData) => {
    try {
      if (testimonial) {
        await updateTestimonial.mutateAsync({
          id: testimonial.id,
          customerName: data.customerName,
          rating: data.rating,
          reviewText: data.reviewText,
          date: data.date,
        });
        toast.success('Testimonial updated successfully');
      } else {
        await addTestimonial.mutateAsync({
          customerName: data.customerName,
          rating: data.rating,
          reviewText: data.reviewText,
          date: data.date,
        });
        toast.success('Testimonial added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(testimonial ? 'Failed to update testimonial' : 'Failed to add testimonial');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name *</Label>
        <Input
          id="customerName"
          {...register('customerName', { required: 'Name is required' })}
          placeholder="Enter customer name"
        />
        {errors.customerName && (
          <p className="text-sm text-destructive">{errors.customerName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Rating *</Label>
        <StarRating
          rating={rating}
          onRatingChange={(newRating) => setValue('rating', newRating)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewText">Review *</Label>
        <Textarea
          id="reviewText"
          {...register('reviewText', { required: 'Review is required' })}
          placeholder="Enter customer review"
          rows={4}
        />
        {errors.reviewText && (
          <p className="text-sm text-destructive">{errors.reviewText.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          {...register('date', { required: 'Date is required' })}
          placeholder="e.g., January 15, 2026"
        />
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
        </Button>
      </div>
    </form>
  );
}
