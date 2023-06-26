import { Displacement } from "../../../domain/entities/displacement";
import { DisplacementGateway } from "../../../domain/gateways/displacement.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListDisplacementUseCase implements BaseUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  execute(): Promise<Displacement[]> {
    return this.displacementGateway.getAll();
  }
}
