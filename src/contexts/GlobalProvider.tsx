import React, { createContext, useState } from "react";
import http from "@/src/core/infra/http";
import { MotoristHttpGateway } from "../core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "../core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "../core/infra/gateways/vehicle-http.gateway";
import { DisplacementHttpGateway } from "../core/infra/gateways/displacement-http.gateway";
import { ListDisplacementUseCase } from "../core/application/use-cases/displacement/list-displacement.use-case";
import { DeleteDisplacementUseCase } from "../core/application/use-cases/displacement/delete-displacement.use-case";
import { CreateDisplacementUseCase } from "../core/application/use-cases/displacement/create-displacement.use-case";
import { UpdateDisplacementUseCase } from "../core/application/use-cases/displacement/update-displacement.use-case";
import { GetDisplacementUseCase } from "../core/application/use-cases/displacement/get-displacement.use-case";
import { ListMotoristUseCase } from "../core/application/use-cases/motorist/list-motorist.use-case";
import { DeleteMotoristUseCase } from "../core/application/use-cases/motorist/delete-motorist.use-case";
import { CreateMotoristUseCase } from "../core/application/use-cases/motorist/create-motorist.use-case";
import { UpdateMotoristUseCase } from "../core/application/use-cases/motorist/update-motorist.use-case";
import { GetMotoristUseCase } from "../core/application/use-cases/motorist/get-motorist.use-case";
import { ListVehicleUseCase } from "../core/application/use-cases/vehicle/list-vehicle.use-case";
import { DeleteVehicleUseCase } from "../core/application/use-cases/vehicle/delete-vehicle.use-case";
import { CreateVehicleUseCase } from "../core/application/use-cases/vehicle/create-vehicle.use-case";
import { UpdateVehicleUseCase } from "../core/application/use-cases/vehicle/update-vehicle.use-case";
import { GetVehicleUseCase } from "../core/application/use-cases/vehicle/get-vehicle.use-case";
import { ListUserUseCase } from "../core/application/use-cases/user/list-user.use-case";
import { DeleteUserUseCase } from "../core/application/use-cases/user/delete-user.use-case";
import { CreateUserUseCase } from "../core/application/use-cases/user/create-user.use-case";
import { UpdateUserUseCase } from "../core/application/use-cases/user/update-user.use-case";
import { GetUserUseCase } from "../core/application/use-cases/user/get-user.use-case";
import { IDisplacementUseCase } from "../core/application/interfaces/displacement-use-case.interface";
import { IMotoristUseCase } from "../core/application/interfaces/motorist-use-case.interface";
import { IVehicleUseCase } from "../core/application/interfaces/vehicle-use-case.interface";
import { IUserUseCase } from "../core/application/interfaces/user-use-case.interface";

export type Alert = {
  open: boolean;
  status: string;
  message: string;
};

export type GlobalValues = {
  alert: Alert;
  handleOpenAlert: Function;
  handleCloseAlert: Function;
  displacementUseCases: IDisplacementUseCase;
  motoristUseCases: IMotoristUseCase;
  vehicleUseCases: IVehicleUseCase;
  userUseCases: IUserUseCase;
};

const gatewayMotorist = new MotoristHttpGateway(http);
const gatewayUser = new UserHttpGateway(http);
const gatewayVehicle = new VehicleHttpGateway(http);
const gatewayDisplacement = new DisplacementHttpGateway(
  http,
  gatewayMotorist,
  gatewayUser,
  gatewayVehicle
);

const displacementUseCases = {
  useCaseList: new ListDisplacementUseCase(gatewayDisplacement),
  useCaseDelete: new DeleteDisplacementUseCase(gatewayDisplacement),
  useCaseCreate: new CreateDisplacementUseCase(gatewayDisplacement),
  useCaseUpdate: new UpdateDisplacementUseCase(gatewayDisplacement),
  useCaseGet: new GetDisplacementUseCase(gatewayDisplacement),
};

const motoristUseCases = {
  useCaseList: new ListMotoristUseCase(gatewayMotorist),
  useCaseDelete: new DeleteMotoristUseCase(gatewayMotorist),
  useCaseCreate: new CreateMotoristUseCase(gatewayMotorist),
  useCaseUpdate: new UpdateMotoristUseCase(gatewayMotorist),
  useCaseGet: new GetMotoristUseCase(gatewayMotorist),
};

const vehicleUseCases = {
  useCaseList: new ListVehicleUseCase(gatewayVehicle),
  useCaseDelete: new DeleteVehicleUseCase(gatewayVehicle),
  useCaseCreate: new CreateVehicleUseCase(gatewayVehicle),
  useCaseUpdate: new UpdateVehicleUseCase(gatewayVehicle),
  useCaseGet: new GetVehicleUseCase(gatewayVehicle),
};

const userUseCases = {
  useCaseList: new ListUserUseCase(gatewayUser),
  useCaseDelete: new DeleteUserUseCase(gatewayUser),
  useCaseCreate: new CreateUserUseCase(gatewayUser),
  useCaseUpdate: new UpdateUserUseCase(gatewayUser),
  useCaseGet: new GetUserUseCase(gatewayUser),
};

export const GlobalContext = createContext<GlobalValues>({
  alert: { open: false, message: "", status: "" },
  handleOpenAlert: Function,
  handleCloseAlert: Function,
  displacementUseCases,
  motoristUseCases,
  vehicleUseCases,
  userUseCases,
});

export const GlobalProvider = ({ children }: any) => {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    status: "",
    message: "",
  });

  const handleOpenAlert = ({ status, message }: Alert) => {
    setAlert({ open: true, status, message });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, status: "", message: "" });
  };

  return (
    <GlobalContext.Provider
      value={{
        alert,
        handleOpenAlert,
        handleCloseAlert,
        displacementUseCases,
        motoristUseCases,
        vehicleUseCases,
        userUseCases,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
