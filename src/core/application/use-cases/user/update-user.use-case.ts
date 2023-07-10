import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { User } from "../../../domain/entities/user";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateUserUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<User>) {}

  async execute(id: number, user: User) {
    return this.repository.update(id, user);
  }
}
