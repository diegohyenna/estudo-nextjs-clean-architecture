import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Motorist } from "../../../domain/entities/motorist";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateMotoristUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Motorist>) {}

  async execute(id: number, motorist: Motorist) {
    return this.repository.update(id, motorist);
  }
}
