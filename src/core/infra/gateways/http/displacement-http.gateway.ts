import { Motorist } from "@/src/core/domain/entities/motorist";
import { User } from "@/src/core/domain/entities/user";
import { Vehicle } from "@/src/core/domain/entities/vehicle";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Displacement } from "../../../domain/entities/displacement";
import { HttpRepository } from "../../repository/http/http.repository";

export class DisplacementHttpGateway implements IBaseRepository<Displacement> {
  constructor(
    private repository: HttpRepository<Displacement>,
    private motorist: IBaseRepository<Motorist>,
    private user: IBaseRepository<User>,
    private vehicle: IBaseRepository<Vehicle>
  ) {}

  getAll() {
    return this.repository.get(this.repository.baseUrl).then(async (datas) => {
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

          const newDisplacements = new Displacement(displacement);

          if (motoristSearch) newDisplacements.addMotorist(motoristSearch);
          if (userSearch) newDisplacements.addUser(userSearch);
          if (vehicleSearch) newDisplacements.addVehicle(vehicleSearch);

          return newDisplacements;
        });
      }
      return Promise.reject(datas);
    });
  }

  getById(id: number) {
    return this.repository
      .get(`${this.repository.baseUrl}/${id}`)
      .then((data) => {
        if (data instanceof Displacement && data?.id) {
          return new Displacement(data);
        }
        return Promise.reject(data);
      });
  }

  save(displacement: Displacement) {
    const { kmFinal, fimDeslocamento, ...dataFilterProp } =
      displacement.toJSON();
    return this.repository.post(
      `${this.repository.baseUrl}/IniciarDeslocamento`,
      dataFilterProp
    );
  }

  update(id: number, displacement: Displacement) {
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
    return this.repository.put(
      `${this.repository.baseUrl}/${id}/EncerrarDeslocamento`,
      dataFilterProp
    );
  }

  delete(id: number) {
    return this.repository.remove(`${this.repository.baseUrl}/${id}`, id);
  }
}
