import { BaseInMemoryRepository } from "./base-in-memory.repository";

export class InMemoryRepository<T> extends BaseInMemoryRepository<T> {
  private obj: T[] = [];

  getId(obj: any): number {
    return obj.id;
  }

  getAll(): Promise<T[]> {
    return Promise.resolve(this.obj);
  }

  getById(id: number): Promise<T | undefined> {
    const obj = this.obj.find((ob) => this.getId(ob) === id);
    return Promise.resolve(obj);
  }

  save(obj: any) {
    let id = 1;

    this.obj.map((val: any) => {
      if (val.id >= id) {
        id = val.id + 1;
      }
    });

    try {
      this.obj.push({ ...obj.toJSON(), id });
      return this.handleSuccess("Registro salvo com sucesso!");
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição SAVE");
    }
  }

  update(id: number, obj: any) {
    try {
      const index = this.obj.findIndex((ob) => this.getId(ob) === id);
      if (index !== -1) {
        this.obj[index] = obj.toJSON();
        return this.handleSuccess("Registro atualizado com sucesso!");
      } else {
        return this.handleError([], "Registro não encontrado");
      }
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição UPDATE");
    }
  }

  delete(id: number) {
    try {
      const index = this.obj.findIndex((ob) => this.getId(ob) === id);
      if (index !== -1) {
        this.obj.splice(index, 1);
        return this.handleSuccess("Registro atualizado com sucesso!");
      } else {
        return this.handleError([], "Registro não encontrado");
      }
    } catch (error) {
      return this.handleError(error, "Erro ao realizar a requisição DELETE");
    }
  }
}
