import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { StatusReturn } from "../../infra/http";

export class DeleteMotoristUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.motoristGateway.delete(id);
  }
}
