import { Vehicle } from "../../../domain/entities/vehicle";
import { VehicleGateway } from "../../../domain/gateways/vehicle.gateway";
import { BaseUseCase } from "../../interfaces/base.interface";

export class GetVehicleUseCase implements BaseUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(id: number): Promise<Vehicle> {
    return this.vehicleGateway.getById(id);
  }
}
