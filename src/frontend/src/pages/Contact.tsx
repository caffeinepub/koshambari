import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { useContactInfo } from '@/hooks/useContactInfo';
import { Loader2 } from 'lucide-react';

export default function Contact() {
  const { data: contactInfo, isLoading } = useContactInfo();

  // Default values if not set
  const email = contactInfo?.emailAddress || 'contact@koshambari.com';
  const phone = contactInfo?.phoneNumber || '+91 98765 43210';
  const address = contactInfo?.physicalAddress || 'Koshambari Fashion House\nMumbai, Maharashtra\nIndia';
  const businessHours = contactInfo?.businessHours || 'Monday - Saturday: 10:00 AM - 8:00 PM\nSunday: 11:00 AM - 6:00 PM';

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mt-4 text-muted-foreground">
          We'd love to hear from you. Get in touch with us!
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Send us an email anytime</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 block font-medium text-primary hover:underline"
                >
                  {email}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Call us during business hours</p>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="mt-2 block font-medium text-primary hover:underline"
                >
                  {phone}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visit our store</p>
                <p className="mt-2 whitespace-pre-line font-medium">
                  {address}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Business Hours</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{businessHours}</p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Follow Us</h2>
            <div className="flex justify-center">
              <SocialMediaLinks />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
