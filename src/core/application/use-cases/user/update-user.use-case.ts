import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number, vehicle: User): Promise<StatusReturn> {
    return this.userGateway.update(id, vehicle);
  }
}
