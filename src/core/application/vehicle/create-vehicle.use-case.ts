import { Vehicle } from "../../domain/entities/vehicle";
import { VehicleGateway } from "../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../../infra/http";

export class CreateVehicleUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(vehicle: Vehicle): Promise<StatusReturn> {
    return this.vehicleGateway.save(vehicle);
  }
}
