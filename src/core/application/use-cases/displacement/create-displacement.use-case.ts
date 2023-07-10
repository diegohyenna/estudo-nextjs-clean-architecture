import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Displacement } from "../../../domain/entities/displacement";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateDisplacementUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Displacement>) {}

  async execute(displacement: Displacement) {
    return this.repository.save(displacement);
  }
}
