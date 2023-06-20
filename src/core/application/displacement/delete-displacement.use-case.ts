import { DisplacementGateway } from "../../domain/gateways/displacement.gateway";
import { StatusReturn } from "../../infra/http";

export class DeleteDisplacementUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.displacementGateway.delete(id);
  }
}
