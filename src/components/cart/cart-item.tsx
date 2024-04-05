import Image from "next/image";
import React from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemProps } from "@/types/request/cart";
import { useMutation } from "@tanstack/react-query";
import {
  addToCart,
  cartQueryKey,
  mutateCartKey,
  reduceItemFromCart,
} from "@/services/cart";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";

function CartItem({ cart }: { cart: CartItemProps }) {
  const { isPending: isPendingAdd, mutate: mutateAdd } = useMutation({
    mutationKey: mutateCartKey,
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      toast.success("Item added to cart");
    },
    onError: () => {
      toast.error("Failed adding item to cart");
    },
  });

  const { isPending: isPendingReduce, mutate: mutateReduce } = useMutation({
    mutationKey: mutateCartKey,
    mutationFn: reduceItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      toast.success("1 item quantity removed from cart");
    },
    onError: () => {
      toast.error("Failed removing item from cart");
    },
  });

  const handleAdd = () => {
    mutateAdd(cart);
  };

  const handleReduce = () => {
    mutateReduce(cart.id);
  };

  return (
    <div className="px-2 py-4 border-b flex w-full gap-2">
      <div className="rounded-lg overflow-hidden h-20 w-16 bg-red-400 bg-cover">
        <Image
          src={cart.cover}
          alt={cart.title}
          height={100}
          width={100}
          className="bg-cover"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between">
        <p className="text-sm font-semibold">{cart.title}</p>
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center m-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReduce}
              disabled={isPendingReduce}
              className="h-6 w-6 dark:border-slate-700 p-0 m-0"
            >
              <MinusIcon />
            </Button>
            <div className="font semibold text-sm">{cart.quantity}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAdd}
              disabled={isPendingAdd}
              className="h-6 w-6 dark:border-slate-700 p-0 m-0"
            >
              <PlusIcon />
            </Button>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            ${cart.price * cart.quantity}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
