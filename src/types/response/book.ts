import { CommonResponse } from "../common";
import { Tag } from "./tag";

export interface Book {
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
}

export type GetBooks = CommonResponse<Book[]>;
