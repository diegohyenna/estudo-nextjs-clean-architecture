import { Vehicle } from "../../domain/entities/vehicle";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";

export class GetVehicleUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(id: number): Promise<Vehicle> {
    return this.vehicleGateway.getById(id);
  }
}
