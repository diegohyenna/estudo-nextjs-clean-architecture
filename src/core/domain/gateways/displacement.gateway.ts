import { StatusReturn } from "../../infra/http";
import { Displacement } from "../entities/displacement";
import { BaseGateway } from "./base.gateway";

export interface DisplacementGateway extends BaseGateway {
  getAll(): Promise<Displacement[]>;
  getById(id: number): Promise<Displacement>;
  save(displacement: Displacement): Promise<StatusReturn>;
  update(id: number, displacement: Displacement): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
