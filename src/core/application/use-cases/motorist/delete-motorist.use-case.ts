import { MotoristGateway } from "../../../domain/gateways/motorist.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteMotoristUseCase implements BaseUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.motoristGateway.delete(id);
  }
}
