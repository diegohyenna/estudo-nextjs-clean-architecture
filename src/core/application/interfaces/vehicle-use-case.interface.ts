import { CreateVehicleUseCase } from "../use-cases/vehicle/create-vehicle.use-case";
import { DeleteVehicleUseCase } from "../use-cases/vehicle/delete-vehicle.use-case";
import { GetVehicleUseCase } from "../use-cases/vehicle/get-vehicle.use-case";
import { ListVehicleUseCase } from "../use-cases/vehicle/list-vehicle.use-case";
import { UpdateVehicleUseCase } from "../use-cases/vehicle/update-vehicle.use-case";
import { IUseCasesMethods } from "./base.interface";

export interface IVehicleUseCase extends IUseCasesMethods {
  useCaseList: ListVehicleUseCase;
  useCaseDelete: DeleteVehicleUseCase;
  useCaseCreate: CreateVehicleUseCase;
  useCaseUpdate: UpdateVehicleUseCase;
  useCaseGet: GetVehicleUseCase;
}
