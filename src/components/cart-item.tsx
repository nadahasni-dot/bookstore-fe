import Image from "next/image";
import React from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

function CartItem() {
  return (
    <div className="px-2 py-4 border-b flex w-full gap-2">
      <div className="rounded-lg overflow-hidden h-20 w-16 bg-red-400 bg-cover">
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
          alt="cart-item"
          height={100}
          width={100}
          className="bg-cover"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between">
        <p className="text-sm font-semibold">Book Name</p>
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center m-0">
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 dark:border-slate-700 p-0 m-0"
            >
              <PlusIcon />
            </Button>
            <div className="font semibold text-sm">2</div>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 dark:border-slate-700 p-0 m-0"
            >
              <MinusIcon />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 border-red-500 p-0 m-0 text-red-500 hover:text-red-500 hover:opacity-75"
            >
              <TrashIcon />
            </Button>
          </div>
          <div className="dark:text-slate-300 text-slate-700">$10</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
