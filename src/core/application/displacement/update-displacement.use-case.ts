import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { StatusReturn } from "../../infra/http";

export class UpdateDisplacementUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(id: number, displacement: Displacement): Promise<StatusReturn> {
    return this.displacementGateway.update(id, displacement);
  }
}
