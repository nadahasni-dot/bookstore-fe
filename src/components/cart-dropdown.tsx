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

function CartDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          <div className="flex gap-2 items-center">
            <BackpackIcon />
            <div className="px-[4px] py-[0.5px] rounded bg-blue-400 text-white text-xs">
              0
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Your Cart (2)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="w-full max-h-80 overflow-auto scroll-m-1">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="p-2 flex gap-2 flex-col">
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm dark:text-slate-300 text-slate-700">Total</p>
            <p className="font-semibold dark:text-slate-300 text-slate-700">
              $100
            </p>
          </div>
          <Button
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
