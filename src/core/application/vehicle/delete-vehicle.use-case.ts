import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../../infra/http";

export class DeleteVehicleUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(id: number): Promise<StatusReturn> {
    return this.vehicleGateway.delete(id);
  }
}
