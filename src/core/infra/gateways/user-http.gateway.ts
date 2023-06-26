import { AxiosInstance } from "axios";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { User } from "../../domain/entities/user";
import { StatusReturn } from "../http";
import { BaseHttpGateway } from "./base-http.gateway";

export class UserHttpGateway
  extends BaseHttpGateway<User>
  implements UserGateway
{
  readonly CONST_PATH = "/Cliente";

  constructor(protected http: AxiosInstance) {
    super(http);
  }

  getAll(): Promise<User[]> {
    try {
      return this.get<User[]>(this.CONST_PATH).then((datas) => {
        if (datas instanceof Array) {
          return datas.map((data) => new User(data));
        }
        return Promise.reject(datas);
      });
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter os usuários"
        )
      );
    }
  }

  getById(id: number): Promise<User> {
    try {
      return this.get<User>(`${this.CONST_PATH}/${id}`).then((data: any) => {
        if (data?.id) {
          return new User(data);
        }
        return Promise.reject(data);
      });
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter o usuário"
        )
      );
    }
  }

  save(user: User): Promise<StatusReturn> {
    try {
      return this.post(this.CONST_PATH, user.toJSON());
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar salvar o usuário!"
      );
    }
  }

  update(id: number, user: User): Promise<StatusReturn> {
    try {
      const { numeroDocumento, tipoDocumento, ...dataFilterProp } =
        user.toJSON();
      return this.put(`${this.CONST_PATH}/${id}`, dataFilterProp);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar atualizar o usuário!"
      );
    }
  }
  delete(id: number): Promise<StatusReturn> {
    try {
      return this.remove(`${this.CONST_PATH}/${id}`, id);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar deletar o usuário!"
      );
    }
  }
}
