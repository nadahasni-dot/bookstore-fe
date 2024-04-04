"use client";

import React from "react";
import { BackpackIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import CartItem from "./cart-item";
import { useQuery } from "@tanstack/react-query";
import { cartQueryKey, getCart } from "@/services/cart";

function CartDropdown() {
  const { data } = useQuery({
    queryKey: cartQueryKey,
    queryFn: () => getCart(),
  });

  const calculateTotal = () => {
    if (!data) return 0;
    let total = 0;

    for (const item of data) {
      total += item.price * item.quantity;
    }

    return total;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          <div className="flex gap-2 items-center">
            <BackpackIcon />
            <div className="px-[4px] py-[0.5px] rounded bg-blue-500 text-white text-xs">
              {data?.length || 0}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Your Cart ({data?.length || 0})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="w-full max-h-80 overflow-auto scroll-m-1">
          {data && data.length > 0 ? (
            data.map((cart) => <CartItem key={cart.id} cart={cart} />)
          ) : (
            <p className="text-sm text-center py-4">Cart is empty</p>
          )}
        </div>
        <div className="p-2 flex gap-2 flex-col">
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm dark:text-slate-300 text-slate-700">Total</p>
            <p className="font-semibold dark:text-slate-300 text-slate-700">
              ${calculateTotal()}
            </p>
          </div>
          <Button
            disabled={!data || data.length < 1}
            variant="default"
            className="w-full bg-blue-500 text-white font-semibold"
          >
            Checkout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CartDropdown;
