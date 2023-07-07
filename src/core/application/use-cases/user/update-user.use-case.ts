import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/interfaces/user.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number, user: User): Promise<StatusReturn> {
    return this.userGateway.update(id, user);
  }
}
