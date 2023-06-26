import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(): Promise<User[]> {
    return this.userGateway.getAll();
  }
}
