import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Mail,
  Share2,
  Image,
} from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { to: '/admin/contact-info', label: 'Contact Info', icon: Mail },
  { to: '/admin/social-media', label: 'Social Media', icon: Share2 },
  { to: '/admin/hero-section', label: 'Hero Section', icon: Image },
];

export default function AdminNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className="space-y-1 rounded-lg border border-border bg-background p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
