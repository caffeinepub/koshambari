import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { CartItem } from '@/backend';
import { useMemo } from 'react';

export function useCart() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const cartQuery = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });

  const totalQuery = useQuery<bigint>({
    queryKey: ['cart-total'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.calculateTotal();
    },
    enabled: !!actor && !isFetching,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addToCart(BigInt(productId), BigInt(quantity));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateCartItem(BigInt(productId), BigInt(quantity));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.removeCartItem(BigInt(productId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
  });

  const cartItemCount = useMemo(() => {
    if (!cartQuery.data) return 0;
    return cartQuery.data.reduce((sum, item) => sum + Number(item.quantity), 0);
  }, [cartQuery.data]);

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    total: Number(totalQuery.data || BigInt(0)),
    cartItemCount,
    addToCart: (productId: number, quantity: number) =>
      addToCartMutation.mutateAsync({ productId, quantity }),
    updateQuantity: (productId: number, quantity: number) =>
      updateQuantityMutation.mutateAsync({ productId, quantity }),
    removeFromCart: (productId: number) => removeFromCartMutation.mutateAsync(productId),
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending || removeFromCartMutation.isPending,
  };
}
