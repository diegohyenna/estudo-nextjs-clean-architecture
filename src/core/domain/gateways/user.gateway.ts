import { StatusReturn } from "../../infra/http";
import { User } from "../entities/user";

export interface UserGateway {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  save(user: User): Promise<StatusReturn>;
  update(id: number, user: User): Promise<StatusReturn>;
  delete(id: number): Promise<StatusReturn>;
}
