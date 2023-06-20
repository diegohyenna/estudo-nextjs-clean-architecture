import { Vehicle } from "../../domain/entities/vehicle";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";

export class ListVehicleUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleGateway.getAll();
  }
}
