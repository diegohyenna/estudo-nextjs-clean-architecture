import { DisplacementGateway } from "../../../domain/gateways/displacement.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteDisplacementUseCase implements BaseUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.displacementGateway.delete(id);
  }
}
