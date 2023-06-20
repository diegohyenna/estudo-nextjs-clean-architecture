import { User } from "../../domain/entities/user";
import { UserGateway } from "../../domain/gateways/user.gateway";

export class GetUserUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<User> {
    return this.userGateway.getById(id);
  }
}
