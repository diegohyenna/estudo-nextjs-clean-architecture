import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(user: User): Promise<StatusReturn> {
    return this.userGateway.save(user);
  }
}
