import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Displacement } from "../../../domain/entities/displacement";
import { BaseUseCase } from "../../interfaces/base.interface";

export class GetDisplacementUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Displacement>) {}

  execute(id: number) {
    return this.repository.getById(id);
  }
}
