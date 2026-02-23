import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, MessageSquare, Mail, TrendingUp } from 'lucide-react';
import { useProducts } from '@/hooks/useQueries';
import { useTestimonials } from '@/hooks/useTestimonials';

export default function AdminDashboard() {
  const { data: products = [] } = useProducts(null);
  const { data: testimonials = [] } = useTestimonials();

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      description: 'Active products in catalog',
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      description: 'Customer reviews',
    },
    {
      title: 'Categories',
      value: 3,
      icon: TrendingUp,
      description: 'Product categories',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Koshambari admin panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold">Manage Products</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add, edit, or remove products from your catalog
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold">Update Content</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Modify hero section, contact info, and social media links
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
