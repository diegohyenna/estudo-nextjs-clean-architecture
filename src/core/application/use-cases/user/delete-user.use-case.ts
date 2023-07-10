import { User } from "@/src/core/domain/entities/user";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteUserUseCase implements BaseUseCase {
  constructor(private repository: IBaseRepository<User>) {}

  async execute(id: number) {
    return this.repository.delete(id);
  }
}
