import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { StatusReturn } from "../../infra/http";

export class CreateDisplacementUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(displacement: Displacement): Promise<StatusReturn> {
    return this.displacementGateway.save(displacement);
  }
}
