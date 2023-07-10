import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { User } from "../../../domain/entities/user";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListUserUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<User>) {}

  async execute() {
    return this.repository.getAll();
  }
}
