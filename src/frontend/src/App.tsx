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
import AdminRoute from './components/AdminRoute';

const rootRoute = createRootRoute({
  component: Layout,
});

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

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLogin,
});

// Admin routes with protection
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
