export type Meta = {
  page: number;
  perPage: number;
};

export type CommonResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
};
