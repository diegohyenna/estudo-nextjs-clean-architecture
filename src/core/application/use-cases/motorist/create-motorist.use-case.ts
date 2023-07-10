import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Motorist } from "../../../domain/entities/motorist";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateMotoristUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<Motorist>) {}

  async execute(motorist: Motorist) {
    return this.repository.save(motorist);
  }
}
