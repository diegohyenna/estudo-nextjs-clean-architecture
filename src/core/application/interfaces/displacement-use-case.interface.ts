import { CreateDisplacementUseCase } from "../use-cases/displacement/create-displacement.use-case";
import { DeleteDisplacementUseCase } from "../use-cases/displacement/delete-displacement.use-case";
import { GetDisplacementUseCase } from "../use-cases/displacement/get-displacement.use-case";
import { ListDisplacementUseCase } from "../use-cases/displacement/list-displacement.use-case";
import { UpdateDisplacementUseCase } from "../use-cases/displacement/update-displacement.use-case";
import { IUseCasesMethods } from "./base.interface";

export interface IDisplacementUseCase extends IUseCasesMethods {
  useCaseList: ListDisplacementUseCase;
  useCaseDelete: DeleteDisplacementUseCase;
  useCaseCreate: CreateDisplacementUseCase;
  useCaseUpdate: UpdateDisplacementUseCase;
  useCaseGet: GetDisplacementUseCase;
}
