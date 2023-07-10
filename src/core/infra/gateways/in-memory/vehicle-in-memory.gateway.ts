import { Vehicle } from "@/src/core/domain/entities/vehicle";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

export class VehicleInMemoryGateway implements IBaseRepository<Vehicle> {
  constructor(private repository: IBaseRepository<Vehicle>) {}

  getAll() {
    return this.repository.getAll().then((datas) => {
      if (datas instanceof Array) {
        return datas.map((data) => new Vehicle(data));
      }
      return Promise.reject(datas);
    });
  }

  getById(id: number) {
    return this.repository.getById(id).then((data) => {
      if (data?.id) {
        return new Vehicle(data);
      }
      return Promise.reject(data);
    });
  }

  save(vehicle: Vehicle) {
    return this.repository.save(vehicle);
  }

  update(id: number, vehicle: Vehicle) {
    return this.repository.update(id, vehicle);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
