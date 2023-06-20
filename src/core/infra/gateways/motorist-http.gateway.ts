import { AxiosInstance } from "axios";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { Motorist } from "../../domain/entities/motorist";
import { StatusReturn } from "../http";

export class MotoristHttpGateway implements MotoristGateway {
  readonly CONST_PATH = "/Condutor";

  constructor(private http: AxiosInstance) {}

  async getAll(): Promise<Motorist[]> {
    return this.http
      .get<Motorist[]>(this.CONST_PATH)
      .then((res) => res.data.map((data) => new Motorist(data)))
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter os motoristas!",
        })
      );
  }

  async getById(id: number): Promise<Motorist> {
    return this.http
      .get<Motorist>(`${this.CONST_PATH}/${id}`)
      .then((res) => res.data)
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter o motorista!",
        })
      );
  }

  save(motorist: Motorist): Promise<StatusReturn> {
    return this.http
      .post(this.CONST_PATH, motorist.toJSON())
      .then(() =>
        Promise.resolve({
          status: 200,
          message: "Registro salvo com sucesso!",
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar salvar o motorista!",
        })
      );
  }

  update(id: number, motorist: Motorist): Promise<StatusReturn> {
    const { nome, numeroHabilitacao, ...dataFilterProp } = motorist.toJSON();
    return this.http
      .put(`${this.CONST_PATH}/${id}`, dataFilterProp)
      .then(() =>
        Promise.resolve({
          status: 200,
          message: "Registro atualizado com sucesso!",
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message:
            res?.response?.data || "Erro ao tentar atualizar o motorista!",
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
          message: res?.response?.data || "Erro ao tentar deletar o motorista!",
        })
      );
  }
}
