import { CreateMotoristUseCase } from "../use-cases/motorist/create-motorist.use-case";
import { DeleteMotoristUseCase } from "../use-cases/motorist/delete-motorist.use-case";
import { GetMotoristUseCase } from "../use-cases/motorist/get-motorist.use-case";
import { ListMotoristUseCase } from "../use-cases/motorist/list-motorist.use-case";
import { UpdateMotoristUseCase } from "../use-cases/motorist/update-motorist.use-case";
import { IUseCasesMethods } from "./base.interface";

export interface IMotoristUseCase extends IUseCasesMethods {
  useCaseList: ListMotoristUseCase;
  useCaseDelete: DeleteMotoristUseCase;
  useCaseCreate: CreateMotoristUseCase;
  useCaseUpdate: UpdateMotoristUseCase;
  useCaseGet: GetMotoristUseCase;
}
