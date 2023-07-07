import { UserHttpGateway } from "@/src/core/infra/gateways/http/user-http.gateway";
import { User } from "../../../domain/entities/user";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListUserUseCase implements BaseUseCase {
  constructor(private userGateway: UserHttpGateway) {}

  async execute(): Promise<User[]> {
    return this.userGateway.getAll();
  }
}
