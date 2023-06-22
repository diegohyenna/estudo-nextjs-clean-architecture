import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { ListMotoristUseCase } from "@/src/core/application/use-cases/motorist/list-motorist.use-case";
import { ListUserUseCase } from "@/src/core/application/use-cases/user/list-user.use-case";
import { ListVehicleUseCase } from "@/src/core/application/use-cases/vehicle/list-vehicle.use-case";
import { Displacement } from "@/src/core/domain/entities/displacement";
import { MotoristsProps } from "@/src/core/domain/entities/motorist";
import { UsersProps } from "@/src/core/domain/entities/user";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http from "@/src/core/infra/http";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Create() {
  const router = useRouter();

  const { handleOpenAlert, displacementUseCases } = useContext(GlobalContext);

  const [user, setUser] = useState<UsersProps[]>([]);
  const [motorist, setMotorist] = useState<MotoristsProps[]>([]);
  const [vehicle, setVehicle] = useState<VehiclesProps[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const obj = new Displacement(data);
    displacementUseCases.useCaseCreate
      .execute(obj)
      .then((res) => {
        router.push("/displacements").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Sucesso!",
            status: "success",
          });
        });
      })
      .catch((res) => {
        const errors = res?.err?.errors
          ? Object.values(res?.err?.errors)
          : null;
        if (errors)
          errors.map((error: any) => {
            res.message = error;
          });
        router.push("/displacements").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
        });
      });
  };

  // useEffect(() => {
  //   if (id && getByIdPromise) {
  //     setLoading(true);
  //     getByIdPromise(id)
  //       .then(() => setLoading(false))
  //       .catch(() => setLoading(false));
  //   }
  // }, [id]);

  // const onChange = (e: any) => {
  //   setError({ prop: "", message: "" });
  //   setDisplacement({ ...displacement, [e.id]: e.value });
  // };

  // const onChangeSelect = (props: any, a: any) => {
  //   console.log(props);
  //   // setDisplacement({ ...displacement, [props]: e.value });
  // };

  const onFocus = (e: any) => {
    document.querySelector(`#${e.id}`)?.setAttribute("type", "date");
  };

  const onBlur = (e: any) => {
    !e.value.length
      ? document.querySelector(`#${e.id}`)?.setAttribute("type", "text")
      : "";
  };

  const useEffectAction = () => {
    const userGateway = new UserHttpGateway(http);
    const useCaseUser = new ListUserUseCase(userGateway);

    const motoristGateway = new MotoristHttpGateway(http);
    const useCaseMotorist = new ListMotoristUseCase(motoristGateway);

    const vehicleGateway = new VehicleHttpGateway(http);
    const useCaseVehicle = new ListVehicleUseCase(vehicleGateway);

    const userPromise = useCaseUser
      .execute()
      .then((res) => setUser(res.map((data) => data.toJSON())));

    const motoristPromise = useCaseMotorist
      .execute()
      .then((res) => setMotorist(res.map((data) => data.toJSON())));

    const vehiclePromise = useCaseVehicle
      .execute()
      .then((res) => setVehicle(res.map((data) => data.toJSON())));

    return Promise.all([userPromise, motoristPromise, vehiclePromise])
      .then(() => true)
      .catch(() =>
        router.push("/displacements").then(() => {
          handleOpenAlert({
            open: true,
            message: "Não foi possivel carregar os selects de dados!",
            status: "error",
          });
        })
      );
  };

  return (
    <FormCreate
      title="Criar um novo deslocamento"
      onSubmit={handleSubmit(onSubmit)}
      useEffects={{ action: useEffectAction, dependencyArray: [] }}
    >
      <>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="idCliente"
            label="Selecione o Usuário"
            select
            fullWidth
            error={errors.idCliente ? true : false}
            helperText={errors.idCliente && "Selecione um usuário"}
            {...register("idCliente", { required: true })}
          >
            {user &&
              user.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nome}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="idCondutor"
            label="Selecione o Motorista"
            select
            fullWidth
            // onChangeCapture={(e) => onChangeSelect(e.target)}
            error={errors.idCondutor ? true : false}
            helperText={errors.idCondutor && "Selecione um motorista"}
            {...register("idCondutor", { required: true })}
          >
            {motorist &&
              motorist.map((motorist) => (
                <MenuItem key={motorist.id} value={motorist.id}>
                  {motorist.nome}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="idVeiculo"
            label="Selecione o Veículo"
            select
            fullWidth
            // onChangeCapture={(e) => onChangeSelect(e.target)}
            error={errors.idVeiculo ? true : false}
            helperText={errors.idVeiculo && "Selecione um veículo"}
            {...register("idVeiculo", { required: true })}
          >
            {vehicle &&
              vehicle.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.marcaModelo}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6}></Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="inicioDeslocamento"
            label="Início deslocamento"
            type="text"
            fullWidth
            title="Informe o inicio do deslocamento"
            onFocus={(e) => onFocus(e.target)}
            onBlurCapture={(e) => onBlur(e.target)}
            error={errors.inicioDeslocamento ? true : false}
            helperText={
              errors.inicioDeslocamento ? errors.inicioDeslocamento.message : ""
            }
            {...register("inicioDeslocamento", {
              required: {
                value: true,
                message: "Digite uma data",
              },
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "Digite uma data válida",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth required>
            <TextField
              margin="dense"
              id="kmInicial"
              label="Km Inicial"
              type="number"
              fullWidth
              title="Informe a kilometragem inicial"
              // onChange={(e) => onChange(e.target)}
              error={errors.kmInicial ? true : false}
              helperText={errors.kmInicial ? errors.kmInicial.message : ""}
              {...register("kmInicial", {
                required: {
                  value: true,
                  message: "Digite a kilometragem inicial!",
                },
              })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth required>
            <TextField
              margin="dense"
              id="checkList"
              label="Checklist"
              type="text"
              fullWidth
              title="Informe um checklist"
              // onChange={(e) => onChange(e.target)}
              error={errors.checkList ? true : false}
              helperText={errors.checkList ? errors.checkList.message : ""}
              {...register("checkList", {
                required: { value: true, message: "Digite um checklist!" },
              })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            label="Motivo"
            type="text"
            fullWidth
            title="Informe um motivo"
            error={errors.motivo ? true : false}
            helperText={errors.motivo ? errors.motivo.message : ""}
            {...register("motivo", {
              required: { value: true, message: "Digite um motivo!" },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            label="Observação"
            type="text"
            fullWidth
            title="Informe uma observação"
            error={errors.observacao ? true : false}
            helperText={errors.observacao ? errors.observacao.message : ""}
            {...register("observacao", {
              required: { value: true, message: "Digite uma observação!" },
            })}
          />
        </Grid>
      </>
    </FormCreate>
  );
}

export default Create;
