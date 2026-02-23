import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to admin login if not authenticated
        navigate({ to: '/admin/login' });
      } else if (isAuthenticated && !isAdmin) {
        // Show error and redirect if authenticated but not admin
        toast.error('Access denied. Administrator privileges required.');
        setTimeout(() => {
          navigate({ to: '/' });
        }, 2000);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  // Show loading state while checking authentication and admin status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show access denied message for authenticated non-admin users
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              Administrator privileges are required to access this page. Your account does not have the necessary permissions.
            </AlertDescription>
          </Alert>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate({ to: '/' })}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Render admin content for authenticated admin users
  return <>{children}</>;
}
