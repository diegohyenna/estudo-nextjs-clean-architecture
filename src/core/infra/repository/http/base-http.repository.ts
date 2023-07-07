import { StatusReturn } from "../../http";

export abstract class BaseHttpRepository<T> {
  protected handleError(
    error: any,
    defaultMessage: string
  ): Promise<StatusReturn> {
    let message = "";

    message =
      error?.message && typeof error?.message == "string"
        ? error?.message
        : error?.response?.data && typeof error?.response?.data == "string"
        ? error?.response?.data
        : defaultMessage;

    return Promise.reject({ err: error, status: 500, message });
  }

  protected handleSuccess(defaultMessage: string): StatusReturn {
    return {
      status: 200,
      message: defaultMessage,
    };
  }

  protected abstract get(path: string): Promise<T | StatusReturn>;

  protected abstract post(path: string, data: any): Promise<StatusReturn>;

  protected abstract put(path: string, data: any): Promise<StatusReturn>;

  protected abstract remove(path: string, id: number): Promise<StatusReturn>;
}
