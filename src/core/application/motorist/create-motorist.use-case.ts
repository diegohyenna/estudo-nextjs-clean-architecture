import { Motorist } from "../../domain/entities/motorist";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";
import { StatusReturn } from "../../infra/http";

export class CreateMotoristUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(motorist: Motorist): Promise<StatusReturn> {
    return this.motoristGateway.save(motorist);
  }
}
