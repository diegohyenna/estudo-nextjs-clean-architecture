import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Displacement } from "../../../domain/entities/displacement";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateDisplacementUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Displacement>) {}

  async execute(id: number, displacement: Displacement) {
    return this.repository.update(id, displacement);
  }
}
