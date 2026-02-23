import TestimonialCard from './TestimonialCard';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Loader2 } from 'lucide-react';

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="container py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
        <p className="mt-4 text-muted-foreground">
          Trusted by thousands of happy customers across India
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id.toString()}
            name={testimonial.customerName}
            rating={Number(testimonial.rating)}
            review={testimonial.reviewText}
            date={testimonial.date}
          />
        ))}
      </div>
    </section>
  );
}
