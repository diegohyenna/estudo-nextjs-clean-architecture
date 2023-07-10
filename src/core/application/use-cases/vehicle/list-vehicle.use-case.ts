import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";
import { Vehicle } from "../../../domain/entities/vehicle";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListVehicleUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Vehicle>) {}

  async execute() {
    return this.repository.getAll();
  }
}
