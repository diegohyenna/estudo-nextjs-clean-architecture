import { UserGateway } from "../../domain/gateways/user.gateway";
import { StatusReturn } from "../../infra/http";

export class DeleteUserUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.userGateway.delete(id);
  }
}
