import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContactInfo, useUpdateContactInfo } from '@/hooks/useContactInfo';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormData {
  emailAddress: string;
  phoneNumber: string;
  physicalAddress: string;
  businessHours: string;
}

export default function AdminContactInfo() {
  const { data: contactInfo, isLoading } = useContactInfo();
  const updateContactInfo = useUpdateContactInfo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    values: contactInfo || {
      emailAddress: '',
      phoneNumber: '',
      physicalAddress: '',
      businessHours: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateContactInfo.mutateAsync(data);
      toast.success('Contact information updated successfully');
    } catch (error) {
      toast.error('Failed to update contact information');
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
        <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
        <p className="text-muted-foreground">Update your business contact details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address *</Label>
              <Input
                id="emailAddress"
                type="email"
                {...register('emailAddress', { required: 'Email is required' })}
                placeholder="contact@example.com"
              />
              {errors.emailAddress && (
                <p className="text-sm text-destructive">{errors.emailAddress.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                {...register('phoneNumber', { required: 'Phone number is required' })}
                placeholder="+91 98765 43210"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="physicalAddress">Physical Address *</Label>
              <Textarea
                id="physicalAddress"
                {...register('physicalAddress', { required: 'Address is required' })}
                placeholder="Enter your business address"
                rows={3}
              />
              {errors.physicalAddress && (
                <p className="text-sm text-destructive">{errors.physicalAddress.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessHours">Business Hours *</Label>
              <Textarea
                id="businessHours"
                {...register('businessHours', { required: 'Business hours are required' })}
                placeholder="e.g., Monday - Saturday: 10:00 AM - 8:00 PM"
                rows={3}
              />
              {errors.businessHours && (
                <p className="text-sm text-destructive">{errors.businessHours.message}</p>
              )}
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
