import { CommonResponse } from "../common";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type SignInResponse = CommonResponse<User>;
