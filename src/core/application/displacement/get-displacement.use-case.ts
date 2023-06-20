import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";

export class GetDisplacementUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(id: number): Promise<Displacement> {
    return this.displacementGateway.getById(id);
  }
}
