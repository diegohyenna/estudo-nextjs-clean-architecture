import { Motorist } from "../../domain/entities/motorist";
import { MotoristGateway } from "../../domain/gateways/motorist.gateway";

export class ListMotoristUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(): Promise<Motorist[]> {
    return this.motoristGateway.getAll();
  }
}
