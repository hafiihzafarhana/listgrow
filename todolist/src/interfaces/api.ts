export interface IApiResponse<T> {
  msg: string;
  status: number;
  result: T;
  token?: string;
}
