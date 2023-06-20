import { User } from "../../domain/entities/user";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { StatusReturn } from "../../infra/http";

export class UpdateUserUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number, vehicle: User): Promise<StatusReturn> {
    return this.userGateway.update(id, vehicle);
  }
}
