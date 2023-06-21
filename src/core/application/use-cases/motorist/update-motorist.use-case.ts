import { Motorist } from "../../../domain/entities/motorist";
import { MotoristGateway } from "../../../domain/gateways/motorist.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateMotoristUseCase implements BaseUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number, motorist: Motorist): Promise<StatusReturn> {
    return this.motoristGateway.update(id, motorist);
  }
}
