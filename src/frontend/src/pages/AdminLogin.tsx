import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminLogin() {
  const { isAuthenticated, isAdmin, isLoading, login, loginStatus } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Only redirect if fully loaded and user is both authenticated and admin
    if (!isLoading && isAuthenticated && isAdmin) {
      navigate({ to: '/admin' });
    }
    
    // Show error if authenticated but not admin
    if (!isLoading && isAuthenticated && !isAdmin) {
      setErrorMessage('Access denied. Your account does not have administrator privileges.');
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed. Please try again.');
    }
  };

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Sign in with Internet Identity to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <p className="font-medium">Admin Login Required</p>
            <p className="mt-1">
              Only authorized administrators can access the admin panel. Please authenticate using your Internet Identity.
            </p>
          </div>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoggingIn || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Login with Internet Identity'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
