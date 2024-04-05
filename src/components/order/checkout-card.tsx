"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cartQueryKey, clearCart, getCart } from "@/services/cart";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { checkout, getOrders } from "@/services/order";
import { AxiosError, AxiosResponse } from "axios";
import { CheckoutResponse } from "@/types/response/order";
import { queryClient } from "@/lib/query-client";
import { getUser, queryUserKey, updateUserData } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CheckoutCard() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: cartQueryKey,
    queryFn: () => getCart(),
  });

  const { isPending, mutate } = useMutation({
    ...checkout(),
    onSuccess: (res: AxiosResponse<CheckoutResponse>) => {
      const oldUserData = getUser();

      if (oldUserData) {
        updateUserData({
          ...oldUserData,
          point: oldUserData.point - res.data.data.total,
        });
      }

      clearCart();

      queryClient.invalidateQueries({ queryKey: queryUserKey });
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      queryClient.invalidateQueries({
        queryKey: getOrders({ perPage: 20 }).queryKey,
      });

      toast.success("Checkout Success");
      router.push("/order");
    },
    onError: (res: AxiosError<CheckoutResponse>) => {
      toast.error(res.response?.data.message || "Checkout failed");
    },
  });

  const calculateTotal = () => {
    if (!data) return 0;
    let total = 0;

    for (const item of data) {
      total += item.price * item.quantity;
    }

    return total;
  };

  const handleCheckout = () => {
    if (data) mutate(data);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>Review your items before checkout</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price/pc</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">#{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.price}</TableCell>
                <TableCell className="font-medium text-right">
                  ${item.price * item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium" colSpan={4}>
                Total
              </TableCell>
              <TableCell className="font-medium text-right">
                ${calculateTotal()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isPending} variant="default" size="lg">
              Checkout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Is your order data correct?</AlertDialogTitle>
              <AlertDialogDescription>
                Please make sure the order data is correct. Proceed checkout
                will cut your balance point by total order value
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isPending} onClick={handleCheckout}>
                Proceed Checkout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default CheckoutCard;
