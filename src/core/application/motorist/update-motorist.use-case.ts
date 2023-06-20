import { Motorist } from "../../domain/entities/motorist";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { StatusReturn } from "../../infra/http";

export class UpdateMotoristUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number, motorist: Motorist): Promise<StatusReturn> {
    return this.motoristGateway.update(id, motorist);
  }
}
