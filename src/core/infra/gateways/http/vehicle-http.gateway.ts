import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Vehicle } from "../../../domain/entities/vehicle";
import { HttpRepository } from "../../repository/http/http.repository";

export class VehicleHttpGateway implements IBaseRepository<Vehicle> {
  constructor(private repository: HttpRepository<Vehicle>) {}

  getAll() {
    return this.repository.get(this.repository.baseUrl).then((datas) => {
      if (datas instanceof Array) {
        return datas.map((data) => new Vehicle(data));
      }
      return Promise.reject(datas);
    });
  }

  getById(id: number) {
    return this.repository
      .get(`${this.repository.baseUrl}/${id}`)
      .then((data: any) => {
        if (data?.id) {
          return new Vehicle(data);
        }
        return Promise.reject(data);
      });
  }

  save(vehicle: Vehicle) {
    return this.repository.post(this.repository.baseUrl, vehicle.toJSON());
  }

  update(id: number, vehicle: Vehicle) {
    const { placa, ...dataFilterProp } = vehicle.toJSON();
    return this.repository.put(
      `${this.repository.baseUrl}/${id}`,
      dataFilterProp
    );
  }
  delete(id: number) {
    return this.repository.remove(`${this.repository.baseUrl}/${id}`, id);
  }
}
