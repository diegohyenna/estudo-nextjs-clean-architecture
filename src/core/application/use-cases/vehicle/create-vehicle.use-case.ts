import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Vehicle } from "../../../domain/entities/vehicle";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateVehicleUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Vehicle>) {}

  async execute(vehicle: Vehicle) {
    return this.repository.save(vehicle);
  }
}
