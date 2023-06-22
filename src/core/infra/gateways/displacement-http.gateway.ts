import { AxiosInstance } from "axios";

import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../http";

export class DisplacementHttpGateway implements DisplacementGateway {
  readonly CONST_PATH = "/Deslocamento";

  constructor(
    private http: AxiosInstance,
    private motorist: MotoristGateway,
    private user: UserGateway,
    private vehicle: VehicleGateway
  ) {}

  /**
   * na falta de um endpoint para resgatar os condutores, clientes e veiculos de um tive que fazer algumas requisiçoes a mais
   */
  async getAll(): Promise<Displacement[]> {
    return this.http
      .get<Displacement[]>(this.CONST_PATH)
      .then(async (res) => {
        const displacements = res.data;
        const motorists = await this.motorist.getAll();
        const users = await this.user.getAll();
        const vehicles = await this.vehicle.getAll();

        return displacements.map((displacement) => {
          const motoristSearch = motorists.find(
            (motorist) => motorist.id == displacement.idCondutor
          );

          const userSearch = users.find(
            (user) => user.id == displacement.idCliente
          );

          const vehicleSearch = vehicles.find(
            (vehicle) => vehicle.id == displacement.idVeiculo
          );

          const newDisplacement = new Displacement(displacement);

          if (motoristSearch) newDisplacement.addMotorist(motoristSearch);
          if (userSearch) newDisplacement.addUser(userSearch);
          if (vehicleSearch) newDisplacement.addVehicle(vehicleSearch);

          return newDisplacement;
        });
      })
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

    try {
      return this.http
        .post(`${this.CONST_PATH}/IniciarDeslocamento`, dataFilterProp)
        .then(() =>
          Promise.resolve({
            status: 200,
            message: "Registro salvo com sucesso!",
          })
        )
        .catch((res) => {
          return Promise.reject({
            err: res?.response?.data,
            status: 500,
            message: "Erro ao tentar salvar o deslocamento!",
          });
        });
    } catch (err: any) {
      return Promise.reject({
        err,
        status: 500,
        message: err?.message || "Erro ao tentar salvar o deslocamento!",
      });
    }
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
