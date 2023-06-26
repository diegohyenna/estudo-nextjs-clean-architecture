import { AxiosInstance } from "axios";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { Vehicle } from "../../domain/entities/vehicle";
import { StatusReturn } from "../http";
import { BaseHttpGateway } from "./base-http.gateway";

export class VehicleHttpGateway
  extends BaseHttpGateway<Vehicle>
  implements VehicleGateway
{
  readonly CONST_PATH = "/Veiculo";

  constructor(protected http: AxiosInstance) {
    super(http);
  }

  async getAll(): Promise<Vehicle[]> {
    try {
      return this.get<Vehicle[]>(this.CONST_PATH).then((datas) => {
        if (datas instanceof Array) {
          return datas.map((data) => new Vehicle(data));
        }
        return Promise.reject(datas);
      });
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter os veiculos"
        )
      );
    }
  }

  async getById(id: number): Promise<Vehicle> {
    try {
      return this.get<Vehicle>(`${this.CONST_PATH}/${id}`).then((data: any) => {
        if (data?.id) {
          return new Vehicle(data);
        }
        return Promise.reject(data);
      });
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter o veiculo"
        )
      );
    }
  }

  save(vehicle: Vehicle): Promise<StatusReturn> {
    try {
      return this.post(this.CONST_PATH, vehicle.toJSON());
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar salvar o veiculo!"
      );
    }
  }

  update(id: number, vehicle: Vehicle): Promise<StatusReturn> {
    try {
      const { placa, ...dataFilterProp } = vehicle.toJSON();
      return this.put(`${this.CONST_PATH}/${id}`, dataFilterProp);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar atualizar o veículo!"
      );
    }
  }
  delete(id: number): Promise<StatusReturn> {
    try {
      return this.remove(`${this.CONST_PATH}/${id}`, id);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar deletar o veículo!"
      );
    }
  }
}
