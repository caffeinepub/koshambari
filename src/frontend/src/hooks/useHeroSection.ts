import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { HeroSection } from '@/backend';

export function useHeroSection() {
  const { actor, isFetching } = useActor();

  return useQuery<HeroSection>({
    queryKey: ['heroSection'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getHeroSection();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHeroSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      headline,
      description,
      backgroundImageUrl,
    }: HeroSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateHeroSection(headline, description, backgroundImageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSection'] });
    },
  });
}
