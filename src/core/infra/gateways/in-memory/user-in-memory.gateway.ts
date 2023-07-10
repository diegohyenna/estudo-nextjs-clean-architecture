import { User } from "@/src/core/domain/entities/user";
import { IBaseRepository } from "@/src/core/domain/interfaces/base.interface";

export class UserInMemoryGateway implements IBaseRepository<User> {
  constructor(private repository: IBaseRepository<User>) {}

  getAll() {
    return this.repository.getAll();
  }

  getById(id: number) {
    return this.repository.getById(id);
  }

  save(user: User) {
    return this.repository.save(user);
  }

  update(id: number, user: User) {
    return this.repository.update(id, user);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
