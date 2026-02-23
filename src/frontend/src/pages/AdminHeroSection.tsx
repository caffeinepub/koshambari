import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHeroSection, useUpdateHeroSection } from '@/hooks/useHeroSection';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormData {
  headline: string;
  description: string;
  backgroundImageUrl: string;
}

export default function AdminHeroSection() {
  const { data: heroSection, isLoading } = useHeroSection();
  const updateHeroSection = useUpdateHeroSection();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    values: heroSection || {
      headline: '',
      description: '',
      backgroundImageUrl: '',
    },
  });

  const backgroundImageUrl = watch('backgroundImageUrl');

  const onSubmit = async (data: FormData) => {
    try {
      await updateHeroSection.mutateAsync(data);
      toast.success('Hero section updated successfully');
    } catch (error) {
      toast.error('Failed to update hero section');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hero Section</h2>
        <p className="text-muted-foreground">Update your homepage hero section content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="headline">Headline *</Label>
              <Input
                id="headline"
                {...register('headline', { required: 'Headline is required' })}
                placeholder="Enter hero headline"
              />
              {errors.headline && (
                <p className="text-sm text-destructive">{errors.headline.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                placeholder="Enter hero description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundImageUrl">Background Image URL *</Label>
              <Input
                id="backgroundImageUrl"
                {...register('backgroundImageUrl', { required: 'Image URL is required' })}
                placeholder="Enter background image URL"
              />
              {errors.backgroundImageUrl && (
                <p className="text-sm text-destructive">{errors.backgroundImageUrl.message}</p>
              )}
            </div>

            {backgroundImageUrl && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={backgroundImageUrl}
                    alt="Hero background preview"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
