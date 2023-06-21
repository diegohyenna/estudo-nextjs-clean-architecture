import { Motorist } from "../../../domain/entities/motorist";
import { MotoristGateway } from "../../../domain/gateways/motorist.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListMotoristUseCase implements BaseUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(): Promise<Motorist[]> {
    return this.motoristGateway.getAll();
  }
}
