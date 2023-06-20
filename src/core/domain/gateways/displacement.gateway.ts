import { StatusReturn } from "../../infra/http";
import { Displacement } from "../entities/displacement";

export interface DisplacementGateway {
  getAll(): Promise<Displacement[]>;
  getById(id: number): Promise<Displacement>;
  save(displacement: Displacement): Promise<StatusReturn>;
  update(id: number, displacement: Displacement): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
