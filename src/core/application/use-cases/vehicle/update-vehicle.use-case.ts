import { Vehicle } from "../../../domain/entities/vehicle";
import { VehicleGateway } from "../../../domain/gateways/vehicle.gateway";
import { StatusReturn } from "../../../infra/http";
import { BaseUseCase } from "../../interfaces/base.interface";

export class UpdateVehicleUseCase implements BaseUseCase {
  constructor(private vehicleGateway: VehicleGateway) {}

  async execute(id: number, vehicle: Vehicle): Promise<StatusReturn> {
    return this.vehicleGateway.update(id, vehicle);
  }
}
