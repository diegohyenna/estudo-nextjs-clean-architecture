import { VehicleGateway } from "../../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class DeleteVehicleUseCase implements BaseUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.vehicleGateway.delete(id);
  }
}
