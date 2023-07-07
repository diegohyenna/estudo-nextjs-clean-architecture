import { Vehicle } from "@/src/core/domain/entities/vehicle";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteVehicleUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Vehicle>) {}

  async execute(id: number) {
    return this.repository.delete(id);
  }
}
