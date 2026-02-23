import { useState } from 'react';
import { useAssignAdmin, useRevokeAdmin, useAdminList } from '@/hooks/useAdminManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, UserPlus, Trash2, Shield } from 'lucide-react';
import { Principal } from '@dfinity/principal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminUserManagement() {
  const [newAdminPrincipal, setNewAdminPrincipal] = useState('');
  const [principalError, setPrincipalError] = useState('');
  const [adminToRemove, setAdminToRemove] = useState<string | null>(null);

  const { data: admins = [], isLoading: isLoadingAdmins } = useAdminList();
  const assignAdmin = useAssignAdmin();
  const revokeAdmin = useRevokeAdmin();

  const validatePrincipal = (value: string): boolean => {
    if (!value.trim()) {
      setPrincipalError('Principal ID is required');
      return false;
    }

    try {
      Principal.fromText(value.trim());
      setPrincipalError('');
      return true;
    } catch (error) {
      setPrincipalError('Invalid principal ID format');
      return false;
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePrincipal(newAdminPrincipal)) {
      return;
    }

    try {
      const principal = Principal.fromText(newAdminPrincipal.trim());
      
      // Check if already an admin
      if (admins.some(admin => admin === newAdminPrincipal.trim())) {
        toast.error('This user is already an administrator');
        return;
      }

      await assignAdmin.mutateAsync(principal);
      toast.success('Administrator privileges granted successfully');
      setNewAdminPrincipal('');
      setPrincipalError('');
    } catch (error: any) {
      console.error('Error granting admin privileges:', error);
      toast.error(error.message || 'Failed to grant administrator privileges');
    }
  };

  const handleRemoveAdmin = async () => {
    if (!adminToRemove) return;

    try {
      const principal = Principal.fromText(adminToRemove);
      await revokeAdmin.mutateAsync(principal);
      toast.success('Administrator privileges revoked successfully');
      setAdminToRemove(null);
    } catch (error: any) {
      console.error('Error revoking admin privileges:', error);
      toast.error(error.message || 'Failed to revoke administrator privileges');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage administrator privileges for your site
        </p>
      </div>

      {/* Add New Administrator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Administrator
          </CardTitle>
          <CardDescription>
            Grant administrator privileges to a user by entering their principal ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal ID</Label>
              <Input
                id="principal"
                type="text"
                placeholder="Enter principal ID (e.g., xxxxx-xxxxx-xxxxx-xxxxx-xxx)"
                value={newAdminPrincipal}
                onChange={(e) => {
                  setNewAdminPrincipal(e.target.value);
                  if (principalError) {
                    validatePrincipal(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (newAdminPrincipal.trim()) {
                    validatePrincipal(newAdminPrincipal);
                  }
                }}
                className={principalError ? 'border-destructive' : ''}
              />
              {principalError && (
                <p className="text-sm text-destructive">{principalError}</p>
              )}
              <p className="text-sm text-muted-foreground">
                The principal ID is a unique identifier for each user on the Internet Computer
              </p>
            </div>
            <Button
              type="submit"
              disabled={assignAdmin.isPending || !newAdminPrincipal.trim()}
            >
              {assignAdmin.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Granting Privileges...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Grant Admin Privileges
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Administrators List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Current Administrators
          </CardTitle>
          <CardDescription>
            List of all users with administrator privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingAdmins ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : admins.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Shield className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No administrators found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {admins.map((admin) => (
                <div
                  key={admin}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm break-all">{admin}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setAdminToRemove(admin)}
                    disabled={revokeAdmin.isPending}
                    className="ml-4 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Remove Admin Confirmation Dialog */}
      <AlertDialog open={!!adminToRemove} onOpenChange={(open) => !open && setAdminToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Administrator Privileges?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke administrator privileges from this user? They will no
              longer be able to access the admin panel or manage site content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={revokeAdmin.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveAdmin}
              disabled={revokeAdmin.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {revokeAdmin.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revoking...
                </>
              ) : (
                'Revoke Privileges'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
