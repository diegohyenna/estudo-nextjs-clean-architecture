import { AxiosInstance } from "axios";
import { StatusReturn } from "../http";

export abstract class BaseHttpGateway<T> {
  protected abstract readonly CONST_PATH: string;
  protected http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

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

  protected get<T>(path: string): Promise<T | StatusReturn> {
    try {
      return this.http.get<T>(path).then((res) => res.data);
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição GET");
    }
  }

  protected post(path: string, data: any): Promise<StatusReturn> {
    try {
      return this.http
        .post(path, data)
        .then(() => this.handleSuccess("Registro salvo com sucesso!"))
        .catch((error: any) => {
          return this.handleError(error, "Erro ao tentar salvar o usuário!");
        });
    } catch (error: any) {
      return this.handleError(error, "Erro ao realizar a requisição POST");
    }
  }

  protected async put(path: string, data: any): Promise<StatusReturn> {
    try {
      return this.http
        .put(path, data)
        .then(() => this.handleSuccess("Registro atualizado com sucesso!"))
        .catch((error: any) => {
          return this.handleError(error, "Erro ao tentar atualizar o usuário!");
        });
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição PUT");
    }
  }

  protected remove(path: string, id: number): Promise<StatusReturn> {
    try {
      return this.http
        .delete(path, { data: { id } })
        .then(() => this.handleSuccess("Registro deletado com sucesso!"));
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição DELETE");
    }
  }
}
