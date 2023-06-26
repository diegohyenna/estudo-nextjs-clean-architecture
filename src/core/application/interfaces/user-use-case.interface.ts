import { CreateUserUseCase } from "../use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "../use-cases/user/delete-user.use-case";
import { GetUserUseCase } from "../use-cases/user/get-user.use-case";
import { ListUserUseCase } from "../use-cases/user/list-user.use-case";
import { UpdateUserUseCase } from "../use-cases/user/update-user.use-case";
import { IUseCasesMethods } from "./base.interface";

export interface IUserUseCase extends IUseCasesMethods {
  useCaseList: ListUserUseCase;
  useCaseDelete: DeleteUserUseCase;
  useCaseCreate: CreateUserUseCase;
  useCaseUpdate: UpdateUserUseCase;
  useCaseGet: GetUserUseCase;
}
