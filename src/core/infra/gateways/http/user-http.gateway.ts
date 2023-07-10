import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { User } from "../../../domain/entities/user";
import { HttpRepository } from "../../repository/http/http.repository";

export class UserHttpGateway implements IBaseRepository<User> {
  constructor(private repository: HttpRepository<User>) {}

  getAll() {
    return this.repository.get(this.repository.baseUrl).then((datas) => {
      if (datas instanceof Array) {
        return datas.map((data) => new User(data));
      }
      return Promise.reject(datas);
    });
  }

  getById(id: number) {
    return this.repository
      .get(`${this.repository.baseUrl}/${id}`)
      .then((data: any) => {
        if (data?.id) {
          return new User(data);
        }
        return Promise.reject(data);
      });
  }

  save(user: User) {
    return this.repository.post(this.repository.baseUrl, user.toJSON());
  }

  update(id: number, user: User) {
    const { numeroDocumento, tipoDocumento, ...dataFilterProp } = user.toJSON();
    return this.repository.put(
      `${this.repository.baseUrl}/${id}`,
      dataFilterProp
    );
  }

  delete(id: number) {
    return this.repository.remove(`${this.repository.baseUrl}/${id}`, id);
  }
}
