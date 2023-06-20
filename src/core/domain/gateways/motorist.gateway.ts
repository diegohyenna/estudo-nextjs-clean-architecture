import { StatusReturn } from "../../infra/http";
import { Motorist } from "../entities/motorist";

export interface MotoristGateway {
  getAll(): Promise<Motorist[]>;
  getById(id: number): Promise<Motorist>;
  save(motorist: Motorist): Promise<StatusReturn>;
  update(id: number, motorist: Motorist): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
