import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useHeroSection } from '@/hooks/useHeroSection';
import { Loader2 } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const { data: heroSection, isLoading } = useHeroSection();

  // Default values if no hero section is set
  const headline = heroSection?.headline || 'Elegance Redefined';
  const description = heroSection?.description || 'Discover the finest collection of traditional sarees, contemporary western wear, and exquisite 18 karat gold jewellery. Where tradition meets modern elegance.';
  const backgroundImageUrl = heroSection?.backgroundImageUrl || '/assets/generated/hero-background.dim_1920x1080.png';

  if (isLoading) {
    return (
      <section className="relative flex h-[600px] items-center justify-center overflow-hidden">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={backgroundImageUrl}
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="font-semibold"
              onClick={() => navigate({ to: '/products' })}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold"
              onClick={() => navigate({ to: '/contact' })}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
