import { StatusReturn } from "../../infra/http";

export interface BaseGateway {
  getAll(): Promise<any[]>;
  getById(id: number): Promise<any>;
  save(obj: Object): Promise<StatusReturn>;
  update(id: number, obj: Object): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
