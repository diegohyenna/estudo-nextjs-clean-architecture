import { Displacement } from "../../../domain/entities/displacement";
import { DisplacementGateway } from "../../../domain/interfaces/displacement.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class GetDisplacementUseCase implements BaseUseCase {
  constructor(private displacementGateway: DisplacementGateway) {}

  execute(id: number): Promise<Displacement> {
    return this.displacementGateway.getById(id);
  }
}
