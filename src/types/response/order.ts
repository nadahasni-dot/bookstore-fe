import { CommonResponse } from "../common";
import { User } from "./auth";
import { Tag } from "./tag";

export interface Order {
  id: number;
  userId: number;
  total: number;
  paid: number;
  createdAt: string;
  updatedAt: string;
  orderItems: {
    quantity: number;
    subTotal: number;
    book: {
      id: number;
      title: string;
      writer: string;
      cover: string;
      price: number;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type GetOrders = CommonResponse<Order[]>;

export type CancelOrderResponse = CommonResponse<User>;

export interface OrderedBookItem {
  id: number;
  userId: number;
  total: number;
  paid: number;
  createdAt: string;
  updatedAt: string;
  purchasedItems: {
    book: {
      id: number;
      title: string;
      writer: string;
      cover: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      bookTags: {
        tag: Tag;
      }[];
    };
    quantity: number;
    subTotal: number;
  }[];
}

export type CheckoutResponse = CommonResponse<OrderedBookItem>;
