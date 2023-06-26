import { Displacement } from "../../../domain/entities/displacement";
import { DisplacementGateway } from "../../../domain/gateways/displacement.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class CreateDisplacementUseCase implements BaseUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(displacement: Displacement): Promise<StatusReturn> {
    return this.displacementGateway.save(displacement);
  }
}
