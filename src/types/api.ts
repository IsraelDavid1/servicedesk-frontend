import { AxiosError, AxiosResponse } from 'axios';

export interface ApiError {
  timestamp: string;
  status: number;
  error: string | undefined;
  message: string;
  path: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export type ApiResponse<T> = Promise<AxiosResponse<T>>;
export type ApiErrorCallback = (error: AxiosError<ApiError>) => void;

export interface ApiRequestConfig {
  skipErrorHandling?: boolean;
  timeout?: number;
  headers?: Record<string, string>;
}
