"use client";

import { CancelOrderResponse, Order } from "@/types/response/order";
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
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
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
import { useMutation } from "@tanstack/react-query";
import { cancelOrder, getOrders } from "@/services/order";
import { AxiosError, AxiosResponse } from "axios";
import { queryClient } from "@/lib/query-client";
import { queryUserKey, updateUserData } from "@/services/auth";
import { toast } from "sonner";
import dayjs from "dayjs";

function OrderCard({ order }: { order: Order }) {
  const { id: orderId } = order;

  const { isPending, mutate, isSuccess } = useMutation({
    ...cancelOrder(),
    onSuccess: (res: AxiosResponse<CancelOrderResponse>) => {
      queryClient.invalidateQueries({
        queryKey: getOrders({ perPage: 20 }).queryKey,
      });

      queryClient.invalidateQueries({ queryKey: queryUserKey });

      updateUserData(res.data.data);

      toast.success("Success cancelling order. Balance point updated");
    },
    onError: (res: AxiosError<CancelOrderResponse>) => {
      toast.error(res.response?.data.message || "Cancel order failed");
    },
  });

  const handleCancel = () => {
    mutate({ orderId });
  };

  return (
    <Card key={orderId}>
      <CardHeader>
        <CardTitle>ORDER #{orderId}</CardTitle>
        <CardDescription>
          {dayjs(order.createdAt).format("DD MMMM YYYY HH:mm:ss")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.book.id}>
                <TableCell className="font-medium">#{item.book.id}</TableCell>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.quantity} Pcs</TableCell>
                <TableCell className="text-right">${item.subTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium" colSpan={3}>
                Total
              </TableCell>
              <TableCell className="font-medium text-right">
                ${order.total}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isPending || isSuccess}>
              Cancel Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                order data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending || isSuccess}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isPending || isSuccess} onClick={handleCancel}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default OrderCard;
