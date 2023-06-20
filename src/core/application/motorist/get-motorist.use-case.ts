import { Motorist } from "../../domain/entities/motorist";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";

export class GetMotoristUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number): Promise<Motorist> {
    return this.motoristGateway.getById(id);
  }
}
