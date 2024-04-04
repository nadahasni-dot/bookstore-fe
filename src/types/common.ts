export interface Meta {
  page: string;
  perPage: string;
  totalPage: number;
}

export interface CommonResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
}
