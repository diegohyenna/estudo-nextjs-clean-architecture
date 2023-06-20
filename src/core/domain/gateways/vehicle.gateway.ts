import { StatusReturn } from "../../infra/http";
import { Vehicle } from "../entities/vehicle";

export interface VehicleGateway {
  getAll(): Promise<Vehicle[]>;
  getById(id: number): Promise<Vehicle>;
  save(vehicle: Vehicle): Promise<StatusReturn>;
  update(id: number, vehicle: Vehicle): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
