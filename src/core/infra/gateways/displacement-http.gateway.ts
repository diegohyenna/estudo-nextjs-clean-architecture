import { AxiosInstance } from "axios";

import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../http";
import { BaseHttpGateway } from "./base-http.gateway";

export class DisplacementHttpGateway
  extends BaseHttpGateway<Displacement>
  implements DisplacementGateway
{
  readonly CONST_PATH = "/Deslocamento";

  constructor(
    protected http: AxiosInstance,
    private motorist: MotoristGateway,
    private user: UserGateway,
    private vehicle: VehicleGateway
  ) {
    super(http);
  }

  /**
   * na falta de um endpoint para resgatar os condutores, clientes e veiculos de um tive que fazer algumas requisiçoes a mais
   */
  async getAll(): Promise<Displacement[]> {
    try {
      return this.get<Displacement[]>(this.CONST_PATH)
        .then(async (datas) => {
          if (datas instanceof Array) {
            const displacements = datas;
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
          }
          return Promise.reject(datas);
        })
        .catch((res) =>
          Promise.reject({
            status: 500,
            message:
              res?.response?.data || "Erro ao tentar obter os deslocamentos!",
          })
        );
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter os deslocamentos"
        )
      );
    }
  }

  async getById(id: number): Promise<Displacement> {
    try {
      return this.get<Displacement>(`${this.CONST_PATH}/${id}`).then(
        (data: any) => {
          if (data?.id) {
            return new Displacement(data);
          }
          return Promise.reject(data);
        }
      );
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          error,
          error?.response?.data || "Erro ao tentar obter o deslocamento"
        )
      );
    }
  }

  save(displacement: Displacement): Promise<StatusReturn> {
    try {
      const { kmFinal, fimDeslocamento, ...dataFilterProp } =
        displacement.toJSON();
      return this.post(
        `${this.CONST_PATH}/IniciarDeslocamento`,
        dataFilterProp
      );
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar salvar o deslocamento!"
      );
    }
  }

  update(id: number, displacement: Displacement): Promise<StatusReturn> {
    try {
      const {
        checkList,
        idCliente,
        idCondutor,
        idVeiculo,
        inicioDeslocamento,
        kmInicial,
        motivo,
        motorist,
        user,
        vehicle,
        ...dataFilterProp
      } = displacement.toJSON();
      return this.put(
        `${this.CONST_PATH}/${id}/EncerrarDeslocamento`,
        dataFilterProp
      );
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar encerrar o deslocamento!"
      );
    }
  }

  delete(id: number): Promise<StatusReturn> {
    try {
      return this.remove(`${this.CONST_PATH}/${id}`, id);
    } catch (error: any) {
      return this.handleError(
        error,
        error?.response?.data || "Erro ao tentar deletar o deslocamento!"
      );
    }
  }
}
