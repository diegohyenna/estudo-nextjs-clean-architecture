import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

import { Motorist } from "../../../domain/entities/motorist";
import { HttpRepository } from "../../repository/http/http.repository";

export class MotoristHttpGateway implements IBaseRepository<Motorist> {
  constructor(private repository: HttpRepository<Motorist>) {}

  getAll() {
    return this.repository.get(this.repository.baseUrl).then((datas) => {
      if (datas instanceof Array) {
        return datas.map((data) => new Motorist(data));
      }
      return Promise.reject(datas);
    });
  }

  getById(id: number) {
    return this.repository
      .get(`${this.repository.baseUrl}/${id}`)
      .then((data: any) => {
        if (data?.id) {
          return new Motorist(data);
        }
        return Promise.reject(data);
      });
  }

  save(motorist: Motorist) {
    return this.repository.post(this.repository.baseUrl, motorist.toJSON());
  }

  update(id: number, motorist: Motorist) {
    const { nome, numeroHabilitacao, ...dataFilterProp } = motorist.toJSON();
    return this.repository.put(
      `${this.repository.baseUrl}/${id}`,
      dataFilterProp
    );
  }

  delete(id: number) {
    return this.repository.remove(`${this.repository.baseUrl}/${id}`, id);
  }
}
