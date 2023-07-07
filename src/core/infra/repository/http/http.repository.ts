import http from "@/src/core/infra/http";

import { StatusReturn } from "../../http";
import { BaseHttpRepository } from "./base-http.repository";

export class HttpRepository<T> extends BaseHttpRepository<T> {
  constructor(public baseUrl: string) {
    super();
  }

  get(path: string): Promise<T | StatusReturn> {
    try {
      return http.get(path).then((res) => res.data);
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição GET");
    }
  }

  post(path: string, data: any): Promise<StatusReturn> {
    try {
      return http
        .post(path, data)
        .then(() => this.handleSuccess("Registro salvo com sucesso!"))
        .catch((error: any) => {
          return this.handleError(error, "Erro ao tentar salvar o usuário!");
        });
    } catch (error: any) {
      return this.handleError(error, "Erro ao realizar a requisição POST");
    }
  }

  put(path: string, data: any): Promise<StatusReturn> {
    try {
      return http
        .put(path, data)
        .then(() => this.handleSuccess("Registro atualizado com sucesso!"))
        .catch((error: any) => {
          return this.handleError(error, "Erro ao tentar atualizar o usuário!");
        });
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição PUT");
    }
  }

  remove(path: string, id: number): Promise<StatusReturn> {
    try {
      return http
        .delete(path, { data: { id } })
        .then(() => this.handleSuccess("Registro deletado com sucesso!"));
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição DELETE");
    }
  }
}
