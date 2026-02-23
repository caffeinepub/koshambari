import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminContactInfo from './pages/AdminContactInfo';
import AdminSocialMedia from './pages/AdminSocialMedia';
import AdminHeroSection from './pages/AdminHeroSection';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminRoute from './components/AdminRoute';

// Root route with Layout wrapper for all pages
const rootRoute = createRootRoute({
  component: Layout,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccess,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailure,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

// Admin login route (public, but redirects if already authenticated as admin)
// Access at: /admin/login
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLogin,
});

// Protected admin routes - require authentication and admin privileges
// All routes below are wrapped with AdminRoute for access control

// Admin Dashboard - Main admin panel overview
// Access at: /admin
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin Products Management - Add, edit, delete products
// Access at: /admin/products
const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminProducts />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin Testimonials Management - Add, edit, delete customer testimonials
// Access at: /admin/testimonials
const adminTestimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/testimonials',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminTestimonials />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin Contact Info Management - Update contact details
// Access at: /admin/contact-info
const adminContactInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/contact-info',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminContactInfo />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin Social Media Management - Update social media links
// Access at: /admin/social-media
const adminSocialMediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/social-media',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminSocialMedia />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin Hero Section Management - Update homepage hero content
// Access at: /admin/hero-section
const adminHeroSectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/hero-section',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminHeroSection />
      </AdminLayout>
    </AdminRoute>
  ),
});

// Admin User Management - Manage administrator privileges
// Access at: /admin/users
const adminUserManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <AdminUserManagement />
      </AdminLayout>
    </AdminRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  cartRoute,
  checkoutRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  contactRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminTestimonialsRoute,
  adminContactInfoRoute,
  adminSocialMediaRoute,
  adminHeroSectionRoute,
  adminUserManagementRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
