import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Displacement } from "@/src/core/domain/entities/displacement";
import { MotoristsProps } from "@/src/core/domain/entities/motorist";
import { UsersProps } from "@/src/core/domain/entities/user";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

function Create() {
  const router = useRouter();

  const {
    handleOpenAlert,
    displacementUseCases,
    userUseCases,
    motoristUseCases,
    vehicleUseCases,
  } = useContext(GlobalContext);

  const [user, setUser] = useState<UsersProps[]>([]);
  const [motorist, setMotorist] = useState<MotoristsProps[]>([]);
  const [vehicle, setVehicle] = useState<VehiclesProps[]>([]);

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const obj = new Displacement(data);
    return displacementUseCases.useCaseCreate
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
        router.push("/displacements").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
        });
      });
  };

  const onFocus = (e: any) => {
    document.querySelector(`#${e.id}`)?.setAttribute("type", "date");
  };

  const onBlur = (e: any) => {
    !e.value.length
      ? document.querySelector(`#${e.id}`)?.setAttribute("type", "text")
      : "";
  };

  const useEffectAction = () => {
    const userPromise = userUseCases.useCaseList
      .execute()
      .then((res) => setUser(res.map((data) => data.toJSON())));

    const motoristPromise = motoristUseCases.useCaseList
      .execute()
      .then((res) => setMotorist(res.map((data) => data.toJSON())));

    const vehiclePromise = vehicleUseCases.useCaseList
      .execute()
      .then((res) => setVehicle(res.map((data) => data.toJSON())));

    return Promise.all([userPromise, motoristPromise, vehiclePromise])
      .then(() => Promise.resolve(true))
      .catch(() =>
        router.push("/displacements").then(() => {
          handleOpenAlert({
            open: true,
            message: "Não foi possivel carregar os selects de dados!",
            status: "error",
          });
          return Promise.reject();
        })
      );
  };

  return (
    <FormCreate
      title="Criar um novo deslocamento"
      onSubmit={handleSubmit(onSubmit)}
      useEffects={{ action: useEffectAction, dependencyArray: [loading] }}
      loading={loading}
      setLoading={setLoading}
    >
      <>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="idCliente"
            label="Selecione o Usuário"
            select
            fullWidth
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
              errors.inicioDeslocamento
                ? (errors.inicioDeslocamento.message as string)
                : ""
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
          <TextField
            margin="dense"
            id="kmInicial"
            label="Km Inicial"
            type="number"
            fullWidth
            title="Informe a kilometragem inicial"
            // onChange={(e) => onChange(e.target)}
            error={errors.kmInicial ? true : false}
            helperText={
              errors.kmInicial ? (errors.kmInicial.message as string) : ""
            }
            {...register("kmInicial", {
              required: {
                value: true,
                message: "Digite a kilometragem inicial!",
              },
            })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="checkList"
            label="Checklist"
            type="text"
            fullWidth
            title="Informe um checklist"
            // onChange={(e) => onChange(e.target)}
            error={errors.checkList ? true : false}
            helperText={
              errors.checkList ? (errors.checkList.message as string) : ""
            }
            {...register("checkList", {
              required: { value: true, message: "Digite um checklist!" },
            })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            label="Motivo"
            type="text"
            fullWidth
            title="Informe um motivo"
            error={errors.motivo ? true : false}
            helperText={errors.motivo ? (errors.motivo.message as string) : ""}
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
            helperText={
              errors.observacao ? (errors.observacao.message as string) : ""
            }
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
