import { Motorist } from "../../../domain/entities/motorist";
import { MotoristGateway } from "../../../domain/interfaces/motorist.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateMotoristUseCase implements BaseUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(motorist: Motorist): Promise<StatusReturn> {
    return this.motoristGateway.save(motorist);
  }
}
