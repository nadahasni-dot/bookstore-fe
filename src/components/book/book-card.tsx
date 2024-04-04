"use client";

import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Book } from "@/types/response/book";
import { useMutation } from "@tanstack/react-query";
import { addToCart, cartQueryKey, mutateCartKey } from "@/services/cart";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";

function BookCard({ book }: { book: Book }) {
  const { isPending, mutate } = useMutation({
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

  const handleAddToCart = () => {
    const { id, title, cover, price } = book;
    mutate({
      id,
      title,
      cover,
      price,
      quantity: 1,
    });
  };

  return (
    <Card key={book.id} className="h-64 w-full overflow-hidden relative">
      <div className="h-full bg-cover overflow-hidden absolute">
        <Image alt={book.title} src={book.cover} height={600} width={600} />
      </div>
      <div className="absolute bg-gradient-to-t from-black/90 via-black/70 to-black/40 h-full w-full p-4 flex flex-col justify-between items-end">
        <div className="bg-white font-semibold h-8 w-8 rounded text-black flex items-center justify-center">
          ${book.price}
        </div>
        <div className="w-full">
          <p className="font-semibold text-white">{book.title}</p>
          <p className="text-white text-xs italic">{book.writer}</p>
          <div className="flex gap-2 mt-2">
            {book.bookTags.map((tag) => (
              <Badge
                key={tag.tag.id}
                variant="secondary"
                className="text-xs bg-white/20"
              >
                {tag.tag.name.toUpperCase()}
              </Badge>
            ))}
          </div>
          <Button
            size="sm"
            disabled={isPending}
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-500 hover:opacity-70 transition text-white mt-4 flex gap-1 w-full"
          >
            <PlusIcon /> <p>Add to Cart</p>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default BookCard;
