import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipErrorHandling?: boolean;
  }
}
