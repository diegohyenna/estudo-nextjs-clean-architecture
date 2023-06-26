import { Vehicle } from "../../../domain/entities/vehicle";
import { VehicleGateway } from "../../../domain/gateways/vehicle.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class ListVehicleUseCase implements BaseUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleGateway.getAll();
  }
}
