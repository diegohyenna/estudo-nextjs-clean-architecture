import { AxiosInstance } from "axios";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { Vehicle } from "../../domain/entities/vehicle";
import { StatusReturn } from "../http";

export class VehicleHttpGateway implements VehicleGateway {
  readonly CONST_PATH = "/Veiculo";

  constructor(private http: AxiosInstance) {}

  async getAll(): Promise<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.CONST_PATH)
      .then((res) => res.data)
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter os veiculos",
        })
      );
  }

  async getById(id: number): Promise<Vehicle> {
    return this.http
      .get<Vehicle>(`${this.CONST_PATH}/${id}`)
      .then((res) => res.data)
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar obter o veiculo",
        })
      );
  }

  save(vehicle: Vehicle): Promise<StatusReturn> {
    return this.http
      .post(this.CONST_PATH, vehicle.toJSON())
      .then(() =>
        Promise.resolve({
          status: 200,
          message: `Registro salvo com sucesso!`,
        })
      )
      .catch((res) =>
        Promise.reject({
          status: 500,
          message: res?.response?.data || "Erro ao tentar salvar o veiculo!",
        })
      );
  }

  update(id: number, vehicle: Vehicle): Promise<StatusReturn> {
    const { placa, ...dataFilterProp } = vehicle.toJSON();
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
          message: res?.response?.data || "Erro ao tentar atualizar o veículo!",
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
          message: res?.response?.data || "Erro ao tentar deletar o veículo!",
        })
      );
  }
}
