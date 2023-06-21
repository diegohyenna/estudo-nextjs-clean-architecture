import { UserGateway } from "../../../domain/gateways/user.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.userGateway.delete(id);
  }
}
