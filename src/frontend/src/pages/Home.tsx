import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Shield, Truck } from 'lucide-react';
import { Category } from '@/backend';

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate({ to: '/products', search: { category } });
  };

  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Handpicked collection of finest sarees, dresses, lehengas, and jewellery
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Authentic Products</h3>
              <p className="text-sm text-muted-foreground">
                100% genuine products with quality assurance and certification
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and secure delivery across India with tracking
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Our Collections</h2>
            <p className="mt-4 text-muted-foreground">
              Discover our exquisite range of traditional and modern fashion
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card 
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              onClick={() => handleCategoryClick(Category.sarees)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/generated/category-sarees.dim_400x300.png"
                  alt="Sarees"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-2xl font-semibold">Sarees</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Elegant traditional sarees for every occasion
                </p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              onClick={() => handleCategoryClick(Category.westernDresses)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/generated/category-western-dresses.dim_400x300.png"
                  alt="Western Dresses"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-2xl font-semibold">Western Dresses</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contemporary fashion for the modern woman
                </p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              onClick={() => handleCategoryClick(Category.lehenga)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/generated/category-lehenga.dim_400x300.png"
                  alt="Lehenga"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-2xl font-semibold">Lehenga</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Exquisite traditional lehengas for special occasions
                </p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              onClick={() => handleCategoryClick(Category.jewellery)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/generated/category-jewellery.dim_400x300.png"
                  alt="Jewellery"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-2xl font-semibold">Jewellery</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Stunning jewellery pieces to complement your style
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="font-semibold"
              onClick={() => navigate({ to: '/products' })}
            >
              Explore All Products
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
}
