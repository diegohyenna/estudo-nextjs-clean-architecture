import { StatusReturn } from "../../infra/http";

export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  save(obj: T): Promise<StatusReturn>;
  update(id: number, obj: T): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
