import { StatusReturn } from "../../http";

export abstract class BaseInMemoryRepository<T> {
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

  protected handleSuccess(defaultMessage: string): Promise<StatusReturn> {
    return Promise.resolve({
      status: 200,
      message: defaultMessage,
    });
  }

  protected abstract getId(data: T): number;

  protected abstract getAll(): Promise<T[]>;

  protected abstract getById(id: number): Promise<T | undefined>;

  protected abstract save(data: T): Promise<StatusReturn>;

  protected abstract update(id: number, data: T): Promise<StatusReturn>;

  protected abstract delete(id: number): Promise<StatusReturn>;
}
