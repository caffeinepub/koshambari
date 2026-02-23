import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ContactInfo } from '@/backend';

export function useContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInfo>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      emailAddress,
      phoneNumber,
      physicalAddress,
      businessHours,
    }: ContactInfo) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateContactInfo(emailAddress, phoneNumber, physicalAddress, businessHours);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
    },
  });
}
