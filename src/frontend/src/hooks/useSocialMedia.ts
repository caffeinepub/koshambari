import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { SocialMediaLinks } from '@/backend';

export function useSocialMediaLinks() {
  const { actor, isFetching } = useActor();

  return useQuery<SocialMediaLinks>({
    queryKey: ['socialMediaLinks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getSocialMediaLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSocialMediaLinks() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      facebookUrl,
      instagramUrl,
      whatsappUrl,
    }: SocialMediaLinks) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateSocialMediaLinks(facebookUrl, instagramUrl, whatsappUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialMediaLinks'] });
    },
  });
}
