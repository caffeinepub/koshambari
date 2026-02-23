import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import { useState, useEffect } from 'react';

// Hook to manage the list of administrators locally
export function useAdminList() {
  const { actor, isFetching } = useActor();
  const [adminList, setAdminList] = useState<string[]>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('adminList');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('adminList', JSON.stringify(adminList));
  }, [adminList]);

  return useQuery({
    queryKey: ['adminList'],
    queryFn: async () => {
      // Return the locally stored list
      return adminList;
    },
    enabled: !!actor && !isFetching,
    initialData: adminList,
  });
}

export function useAssignAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.assignAdminRole(user);
      return user.toString();
    },
    onSuccess: (principalString) => {
      // Add to local list
      const currentList = queryClient.getQueryData<string[]>(['adminList']) || [];
      if (!currentList.includes(principalString)) {
        const newList = [...currentList, principalString];
        queryClient.setQueryData(['adminList'], newList);
        localStorage.setItem('adminList', JSON.stringify(newList));
      }
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
  });
}

export function useRevokeAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.revokeAdminRole(user);
      return user.toString();
    },
    onSuccess: (principalString) => {
      // Remove from local list
      const currentList = queryClient.getQueryData<string[]>(['adminList']) || [];
      const newList = currentList.filter(admin => admin !== principalString);
      queryClient.setQueryData(['adminList'], newList);
      localStorage.setItem('adminList', JSON.stringify(newList));
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
  });
}
