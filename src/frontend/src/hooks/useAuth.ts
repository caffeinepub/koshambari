import { useInternetIdentity } from './useInternetIdentity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useAuth() {
  const { identity, loginStatus, login, clear, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !actorFetching,
    retry: false,
  });

  const logout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    identity,
    isAuthenticated,
    isAdmin: isAdmin ?? false,
    isLoading: isInitializing || actorFetching || (isAuthenticated && isCheckingAdmin),
    loginStatus,
    login,
    logout,
  };
}
