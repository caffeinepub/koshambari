import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSocialMediaLinks, useUpdateSocialMediaLinks } from '@/hooks/useSocialMedia';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormData {
  facebookUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
}

export default function AdminSocialMedia() {
  const { data: socialMedia, isLoading } = useSocialMediaLinks();
  const updateSocialMedia = useUpdateSocialMediaLinks();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    values: socialMedia || {
      facebookUrl: '',
      instagramUrl: '',
      whatsappUrl: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Validate URLs
      const urlPattern = /^https?:\/\/.+/;
      if (data.facebookUrl && !urlPattern.test(data.facebookUrl)) {
        toast.error('Please enter a valid Facebook URL');
        return;
      }
      if (data.instagramUrl && !urlPattern.test(data.instagramUrl)) {
        toast.error('Please enter a valid Instagram URL');
        return;
      }
      if (data.whatsappUrl && !urlPattern.test(data.whatsappUrl)) {
        toast.error('Please enter a valid WhatsApp URL');
        return;
      }

      await updateSocialMedia.mutateAsync(data);
      toast.success('Social media links updated successfully');
    } catch (error) {
      toast.error('Failed to update social media links');
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
        <h2 className="text-3xl font-bold tracking-tight">Social Media Links</h2>
        <p className="text-muted-foreground">Update your social media profile URLs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input
                id="facebookUrl"
                {...register('facebookUrl')}
                placeholder="https://facebook.com/yourpage"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to hide the Facebook icon
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                {...register('instagramUrl')}
                placeholder="https://instagram.com/yourprofile"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to hide the Instagram icon
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
              <Input
                id="whatsappUrl"
                {...register('whatsappUrl')}
                placeholder="https://wa.me/919876543210"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to hide the WhatsApp icon
              </p>
            </div>

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
