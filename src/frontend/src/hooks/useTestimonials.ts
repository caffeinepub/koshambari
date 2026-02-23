import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Testimonial } from '@/backend';

export function useTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      rating,
      reviewText,
      date,
    }: {
      customerName: string;
      rating: number;
      reviewText: string;
      date: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addTestimonial(customerName, BigInt(rating), reviewText, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      customerName,
      rating,
      reviewText,
      date,
    }: {
      id: bigint;
      customerName: string;
      rating: number;
      reviewText: string;
      date: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateTestimonial(id, customerName, BigInt(rating), reviewText, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}
