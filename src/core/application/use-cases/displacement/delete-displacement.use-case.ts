import { Displacement } from "@/src/core/domain/entities/displacement";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteDisplacementUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Displacement>) {}

  async execute(id: number) {
    return this.repository.delete(id);
  }
}
