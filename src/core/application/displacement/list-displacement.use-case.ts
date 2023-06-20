import { Displacement } from "../../domain/entities/displacement";
import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";

export class ListDisplacementUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(): Promise<Displacement[]> {
    return this.displacementGateway.getAll();
  }
}
