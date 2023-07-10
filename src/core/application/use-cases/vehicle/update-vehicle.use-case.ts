import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Vehicle } from "../../../domain/entities/vehicle";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateVehicleUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Vehicle>) {}

  async execute(id: number, vehicle: Vehicle) {
    return this.repository.update(id, vehicle);
  }
}
