import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { BaseUseCase } from "../../interfaces/base.interface";
import { Motorist } from "@/src/core/domain/entities/motorist";

export class DeleteMotoristUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Motorist>) {}

  async execute(id: number) {
    return this.repository.delete(id);
  }
}
