import { Motorist } from "../../../domain/entities/motorist";
import { MotoristGateway } from "../../../domain/interfaces/motorist.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class GetMotoristUseCase implements BaseUseCase {
  constructor(private motoristGateway: MotoristGateway) {}

  async execute(id: number): Promise<Motorist> {
    return this.motoristGateway.getById(id);
  }
}
