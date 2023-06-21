import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { CreateDisplacementUseCase } from "@/src/core/application/use-cases/displacement/create-displacement.use-case";
import { ListMotoristUseCase } from "@/src/core/application/use-cases/motorist/list-motorist.use-case";
import { ListUserUseCase } from "@/src/core/application/use-cases/user/list-user.use-case";
import { ListVehicleUseCase } from "@/src/core/application/use-cases/vehicle/list-vehicle.use-case";
import {
  Displacement,
  DisplacementsProps,
} from "@/src/core/domain/entities/displacement";
import { MotoristsProps } from "@/src/core/domain/entities/motorist";
import { UsersProps } from "@/src/core/domain/entities/user";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { DisplacementHttpGateway } from "@/src/core/infra/gateways/displacement-http.gateway";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http from "@/src/core/infra/http";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";

function Create() {
  const router = useRouter();

  const { handleOpenAlert, displacementUseCases } = useContext(GlobalContext);

  const [user, setUser] = useState<UsersProps[]>([]);
  const [motorist, setMotorist] = useState<MotoristsProps[]>([]);
  const [vehicle, setVehicle] = useState<VehiclesProps[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({ prop: "", message: "" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (e: any) => {
    console.log(errors);
    console.log(e);

    // setValue("observacao", "arroa");
  };

  const [displacement, setDisplacement] = useState<DisplacementsProps>({
    idCliente: 0,
    idCondutor: 0,
    idVeiculo: 0,
    checkList: "",
    fimDeslocamento: "",
    inicioDeslocamento: "",
    kmFinal: 0,
    kmInicial: 0,
    motivo: "",
    observacao: "",
  });

  const handleSubmitPromise = () => {
    return new Promise((resolve, reject) => {
      const data = new Displacement(displacement);

      return displacementUseCases.useCaseCreate
        .execute(data)
        .then((res) => {
          router.push("/displacements").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Sucesso!",
              status: "success",
            });
            return resolve(true);
          });
        })
        .catch((res) => {
          router.push("/displacements").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Houve algum erro",
              status: "error",
            });
            return reject();
          });
        });
    });
  };

  const onChange = (e: any) => {
    setError({ prop: "", message: "" });
    setDisplacement({ ...displacement, [e.id]: e.value });
  };

  const onChangeSelect = (props: string, e: any) => {
    setError({ prop: "", message: "" });
    setDisplacement({ ...displacement, [props]: e.value });
  };

  const onFocus = (e: any) => {
    document.querySelector(`#${e.id}`)?.setAttribute("type", "date");
  };

  const onBlur = (e: any) => {
    !e.value.length
      ? document.querySelector(`#${e.id}`)?.setAttribute("type", "text")
      : "";
  };

  useEffect(() => {
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

    Promise.all([userPromise, motoristPromise, vehiclePromise])
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <FormCreate
      title="Iniciar um deslocamento"
      handleSubmitPromise={handleSubmit(onSubmit)}
    >
      {loading && (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )}
      {!loading && (
        <>
          {/* <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required error={error.prop == "idCliente"}>
              <InputLabel id="idCliente">Usuários</InputLabel>
              <Select
                labelId="idCliente"
                id="idCliente"
                value={displacement.idCliente}
                label="Usuários"
                onChange={(e) => onChangeSelect("idCliente", e.target)}
              >
                {user &&
                  user.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.nome}
                    </MenuItem>
                  ))}
              </Select>
              {error.prop == "idCliente" && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required error={error.prop == "idCondutor"}>
              <InputLabel id="idCondutor">Motoristas</InputLabel>
              <Select
                labelId="idCondutor"
                id="idCondutor"
                value={displacement.idCondutor}
                label="Usuários"
                onChange={(e) => onChangeSelect("idCondutor", e.target)}
              >
                {motorist &&
                  motorist.map((motorist) => (
                    <MenuItem key={motorist.id} value={motorist.id}>
                      {motorist.nome}
                    </MenuItem>
                  ))}
              </Select>
              {error.prop == "idCondutor" && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required error={error.prop == "idVeiculo"}>
              <InputLabel id="idVeiculo">Veiculos</InputLabel>
              <Select
                labelId="idVeiculo"
                id="idVeiculo"
                value={displacement.idVeiculo}
                label="Veiculos"
                onChange={(e) => onChangeSelect("idVeiculo", e.target)}
              >
                {vehicle &&
                  vehicle.map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.marcaModelo}
                    </MenuItem>
                  ))}
              </Select>
              {error.prop == "idVeiculo" && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required>
              <TextField
                sx={{ marginTop: 0 }}
                error={error.prop == "inicioDeslocamento"}
                margin="dense"
                id="inicioDeslocamento"
                label="Início deslocamento"
                type="text"
                fullWidth
                onChange={(e) => onChange(e.target)}
                value={displacement.inicioDeslocamento}
                title="Informe o inicio do deslocamento"
                onFocus={(e) => onFocus(e.target)}
                onBlur={(e) => onBlur(e.target)}
                helperText={error.prop == "inicioDeslocamento" && error.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required>
              <TextField
                sx={{ marginTop: 0 }}
                error={error.prop == "kmInicial"}
                margin="dense"
                id="kmInicial"
                label="Km Inicial"
                type="number"
                fullWidth
                onChange={(e) => onChange(e.target)}
                value={displacement.kmInicial}
                title="Informe a kilometragem inicial"
                helperText={error.prop == "kmInicial" && error.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth required>
              <TextField
                sx={{ marginTop: 0 }}
                error={error.prop == "checkList"}
                margin="dense"
                id="checkList"
                label="Checklist"
                type="text"
                fullWidth
                onChange={(e) => onChange(e.target)}
                value={displacement.checkList}
                title="Informe um checklist"
                helperText={error.prop == "checkList" && error.message}
              />
            </FormControl>
          </Grid>
           */}
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              // sx={{ marginTop: 0 }}
              error={errors.motivo ? true : false}
              margin="dense"
              label="Motivo"
              type="text"
              fullWidth
              title="Informe um motivo"
              helperText={errors.motivo ? errors.motivo.message : ""}
              {...register("motivo", {
                required: { value: true, message: "Digite um motivo!" },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              // sx={{ marginTop: 0 }}

              error={errors.observacao ? true : false}
              margin="dense"
              label="Observação"
              type="text"
              fullWidth
              title="Informe uma observação"
              helperText={errors.observacao ? errors.observacao.message : ""}
              {...register("observacao", {
                required: { value: true, message: "Digite uma observação!" },
              })}
            />
          </Grid>
        </>
      )}

      <Grid container item spacing={1} xs={12}>
        <Grid item>
          <Item>
            <Button type="submit" variant="contained" color="success">
              Salvar
            </Button>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Button
              variant="contained"
              color="error"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          </Item>
        </Grid>
      </Grid>
    </FormCreate>

    // <Container maxWidth="sm">
    //   <Typography variant="h4" align="center" gutterBottom>
    //     Formulário
    //   </Typography>
    //   <form onSubmit={handleSubmit(onSubmit)}>

    //     <TextField
    //       label="Data de Nascimento"
    //       fullWidth
    //       error={errors.dataNascimento ? true : false}
    //       helperText={errors.dataNascimento && "Digite uma data válida"}
    //       {...register("dataNascimento", {
    //         required: true,
    //         pattern: /^\d{4}-\d{2}-\d{2}$/,
    //       })}
    //     />

    //     <TextField
    //       label="Select"
    //       select
    //       fullWidth
    //       error={errors.select ? true : false}
    //       helperText={errors.select && "Selecione uma opção"}
    //       {...register("select", { required: true })}
    //     >
    //       <MenuItem value={1}>Opção 1</MenuItem>
    //       <MenuItem value={2}>Opção 2</MenuItem>
    //       <MenuItem value={3}>Opção 3</MenuItem>
    //     </TextField>

    //     <Button type="submit" variant="contained" color="primary" fullWidth>
    //       Enviar
    //     </Button>
    //   </form>
    // </Container>
  );
}

export default Create;
