import { AxiosInstance } from "axios";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { Displacement } from "../../domain/entities/displacement";
import { StatusReturn } from "../http";

export class DisplacementHttpGateway implements DisplacementGateway {
  readonly CONST_PATH = "/Deslocamento";

  constructor(private http: AxiosInstance) {}

  async getAll(): Promise<Displacement[]> {
    return this.http
      .get<Displacement[]>(this.CONST_PATH)
      .then((res) => res.data.map((data) => new Displacement(data)))
      .catch((res) =>
        Promise.reject({
          status: 500,
          message:
            res?.response?.data || "Erro ao tentar obter os deslocamentos!",
        })
      );
  }

  async getById(id: number): Promise<Displacement> {
    return this.http
      .get<Displacement>(`${this.CONST_PATH}/${id}`)
      .then((res) => new Displacement(res.data))
      .catch((res) =>
        Promise.reject({
          status: 500,
          message:
            res?.response?.data || "Erro ao tentar obter o deslocamento!",
        })
      );
  }

  save(displacement: Displacement): Promise<StatusReturn> {
    const { kmFinal, fimDeslocamento, ...dataFilterProp } =
      displacement.toJSON();
    return this.http
      .post(`${this.CONST_PATH}/IniciarDeslocamento`, dataFilterProp)
      .then(() =>
        Promise.resolve({
          status: 200,
          message: "Registro salvo com sucesso!",
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message:
            res?.response?.data || "Erro ao tentar salvar o deslocamento!",
        })
      );
  }

  update(id: number, displacement: Displacement): Promise<StatusReturn> {
    const {
      checkList,
      idCliente,
      idCondutor,
      idVeiculo,
      inicioDeslocamento,
      kmInicial,
      motivo,
      ...dataFilterProp
    } = displacement.toJSON();
    return this.http
      .put(`${this.CONST_PATH}/${id}/EncerrarDeslocamento`, dataFilterProp)
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
            res?.response?.data || "Erro ao tentar atualizar o deslocamento!",
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
          message:
            res?.response?.data || "Erro ao tentar deletar o deslocamento!",
        })
      );
  }
}
