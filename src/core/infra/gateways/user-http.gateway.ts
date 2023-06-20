import { AxiosInstance } from "axios";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { User } from "../../domain/entities/user";
import { StatusReturn } from "../http";

export class UserHttpGateway implements UserGateway {
  readonly CONST_PATH = "/Cliente";

  constructor(private http: AxiosInstance) {}

  async getAll(): Promise<User[]> {
    return this.http
      .get<User[]>(this.CONST_PATH)
      .then((res) => res.data.map((data) => new User(data)))
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter os usuários",
        })
      );
  }

  async getById(id: number): Promise<User> {
    return this.http
      .get<User>(`${this.CONST_PATH}/${id}`)
      .then((res) => new User(res.data))
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter o usuário",
        })
      );
  }

  save(user: User): Promise<StatusReturn> {
    return this.http
      .post(this.CONST_PATH, user.toJSON())
      .then(() =>
        Promise.resolve({
          status: 200,
          message: `Registro salvo com sucesso!`,
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar salvar o usuário!",
        })
      );
  }

  update(id: number, user: User): Promise<StatusReturn> {
    const { numeroDocumento, tipoDocumento, ...dataFilterProp } = user.toJSON();
    return this.http
      .put(`${this.CONST_PATH}/${id}`, dataFilterProp)
      .then(() =>
        Promise.resolve({
          status: 200,
          message: `Registro atualizado com sucesso!`,
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar atualizar o usuário!",
        })
      );
  }
  delete(id: number): Promise<StatusReturn> {
    return this.http
      .delete(`${this.CONST_PATH}/${id}`, { data: { id } })
      .then(() =>
        Promise.resolve({
          status: 200,
          message: `Registro deletado com sucesso!`,
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar deletar o usuário!",
        })
      );
  }
}
