import { CommonResponse } from "../common";

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type GetTags = CommonResponse<Tag[]>;
