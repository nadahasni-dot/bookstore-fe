export type Meta = {
  page: string;
  perPage: string;
  totalPage: number;
};

export type CommonResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
};
