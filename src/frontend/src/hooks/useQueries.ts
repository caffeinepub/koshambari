import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Category, Product } from '@/backend';

export function useProducts(category: Category | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      imageUrl,
      category,
    }: {
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      category: Category;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addProduct(name, description, BigInt(price), imageUrl, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
      imageUrl,
      category,
    }: {
      id: bigint;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      category: Category;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateProduct(id, name, description, BigInt(price), imageUrl, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
