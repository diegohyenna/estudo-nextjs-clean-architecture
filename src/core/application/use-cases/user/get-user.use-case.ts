import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class GetUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<User> {
    return this.userGateway.getById(id);
  }
}
