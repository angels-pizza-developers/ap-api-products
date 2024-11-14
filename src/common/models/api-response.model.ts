export class ApiResponseModel<T> {
  data?: T;
  message?: string;
  success?: boolean;
  statusCode?: any;
  error?: any;
}
