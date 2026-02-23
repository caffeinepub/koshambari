import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      setErrorMessage('Access denied. Your account does not have administrator privileges. Please contact an existing administrator to request access.');
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        setErrorMessage('You are already logged in. Checking admin status...');
      } else {
        setErrorMessage(error.message || 'Login failed. Please try again.');
      }
    }
  };

  const handleReturnHome = () => {
    navigate({ to: '/' });
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
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          {!errorMessage && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Admin Login Required</AlertTitle>
              <AlertDescription>
                Only authorized administrators can access the admin panel. Please authenticate using your Internet Identity.
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-lg border bg-muted/50 p-4 text-sm">
            <p className="font-medium text-foreground">How to Access:</p>
            <ol className="mt-2 space-y-1 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Click the login button below</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Complete Internet Identity authentication</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>System will verify your admin privileges</span>
              </li>
            </ol>
          </div>

          {isAuthenticated && isAdmin && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Authentication successful! Redirecting to admin panel...
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn || isLoading || (isAuthenticated && !isAdmin)}
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

            {errorMessage && (
              <Button
                onClick={handleReturnHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Return to Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
