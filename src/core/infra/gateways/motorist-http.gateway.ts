import { AxiosInstance } from "axios";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { Motorist } from "../../domain/entities/motorist";
import { StatusReturn } from "../http";
import { BaseHttpGateway } from "./base-http.gateway";

export class MotoristHttpGateway
  extends BaseHttpGateway<Motorist>
  implements MotoristGateway
{
  readonly CONST_PATH = "/Condutor";

  constructor(protected http: AxiosInstance) {
    super(http);
  }

  async getAll(): Promise<Motorist[]> {
    try {
      return this.get<Motorist[]>(this.CONST_PATH).then((datas) => {
        if (datas instanceof Array) {
          return datas.map((data) => new Motorist(data));
        }
        return Promise.reject(datas);
      });
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter os motoristas!"
        )
      );
    }
  }

  async getById(id: number): Promise<Motorist> {
    try {
      return this.get<Motorist>(`${this.CONST_PATH}/${id}`).then(
        (data: any) => {
          if (data?.id) {
            return new Motorist(data);
          }
          return Promise.reject(data);
        }
      );
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter o motorista"
        )
      );
    }
  }

  save(motorist: Motorist): Promise<StatusReturn> {
    try {
      return this.post(this.CONST_PATH, motorist.toJSON());
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar salvar o motorista!"
      );
    }
  }

  update(id: number, motorist: Motorist): Promise<StatusReturn> {
    try {
      const { nome, numeroHabilitacao, ...dataFilterProp } = motorist.toJSON();
      return this.put(`${this.CONST_PATH}/${id}`, dataFilterProp);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar atualizar o motorista!"
      );
    }
  }

  delete(id: number): Promise<StatusReturn> {
    try {
      return this.remove(`${this.CONST_PATH}/${id}`, id);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar deletar o motorista!"
      );
    }
  }
}
