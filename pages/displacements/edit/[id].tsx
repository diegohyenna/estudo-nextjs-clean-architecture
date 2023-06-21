import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { GetDisplacementUseCase } from "@/src/core/application/use-cases/displacement/get-displacement.use-case";
import { UpdateDisplacementUseCase } from "@/src/core/application/use-cases/displacement/update-displacement.use-case";
import { GetMotoristUseCase } from "@/src/core/application/use-cases/motorist/get-motorist.use-case";
import { ListMotoristUseCase } from "@/src/core/application/use-cases/motorist/list-motorist.use-case";
import { UpdateMotoristUseCase } from "@/src/core/application/use-cases/motorist/update-motorist.use-case";
import { ListUserUseCase } from "@/src/core/application/use-cases/user/list-user.use-case";
import { ListVehicleUseCase } from "@/src/core/application/use-cases/vehicle/list-vehicle.use-case";
import {
  Displacement,
  DisplacementsProps,
} from "@/src/core/domain/entities/displacement";
import { Motorist, MotoristsProps } from "@/src/core/domain/entities/motorist";
import { UsersProps } from "@/src/core/domain/entities/user";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { DisplacementHttpGateway } from "@/src/core/infra/gateways/displacement-http.gateway";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http from "@/src/core/infra/http";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert } = useContext(GlobalContext);

  const [user, setUser] = useState<UsersProps[]>([]);
  const [motorist, setMotorist] = useState<MotoristsProps[]>([]);
  const [vehicle, setVehicle] = useState<VehiclesProps[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({ prop: "", message: "" });

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

  const id = router.query?.id ? +router.query.id : 0;

  const gateway = new DisplacementHttpGateway(http);
  const useCaseGet = new GetDisplacementUseCase(gateway);
  const useCaseUpdate = new UpdateDisplacementUseCase(gateway);

  const getByIdPromise = (id: number) => {
    return new Promise((resolve, reject) => {
      useCaseGet
        .execute(id)
        .then(async (res) => {
          const displacement = await res.toJSON();

          const dataFormat = {
            ...displacement,
            fimDeslocamento: displacement.fimDeslocamento
              ? new Date(displacement.fimDeslocamento).toLocaleDateString(
                  "pt-BR"
                )
              : "",
          };
          setDisplacement(dataFormat);
          resolve(true);
        })
        .catch((res) => {
          router.push("/displacements").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Houve algum erro",
              status: "error",
            });
            reject();
          });
        });
    });
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

  const handleSubmitPromise = () => {
    return new Promise((resolve, reject) => {
      if (displacement.kmFinal == 0) {
        setError({
          prop: "kmFinal",
          message: "Informe uma kilometragem final",
        });
        return reject();
      }
      if (displacement.fimDeslocamento == "") {
        setError({
          prop: "fimDeslocamento",
          message: "Selecione uma data de fim!",
        });
        return reject();
      }

      if (displacement.observacao == "") {
        setError({
          prop: "observacao",
          message: "Informe uma observação!",
        });
        return reject();
      }

      const data = new Displacement(displacement);

      useCaseUpdate
        .execute(id, data)
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

  const onFocus = (e: any) => {
    document.querySelector(`#${e.id}`)?.setAttribute("type", "date");
  };

  const onBlur = (e: any) => {
    !e.value.length
      ? document.querySelector(`#${e.id}`)?.setAttribute("type", "text")
      : "";
  };

  return (
    <FormCreate
      title="Encerrar o deslocamento"
      handleSubmitPromise={handleSubmitPromise}
      id={id}
      getByIdPromise={getByIdPromise}
    >
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth required>
          <TextField
            sx={{ marginTop: 0 }}
            error={error.prop == "fimDeslocamento"}
            margin="dense"
            id="fimDeslocamento"
            label="Fim deslocamento"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={displacement.fimDeslocamento}
            title="Informe o fim do deslocamento"
            onFocus={(e) => onFocus(e.target)}
            onBlur={(e) => onBlur(e.target)}
            helperText={error.prop == "fimDeslocamento" && error.message}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth required>
          <TextField
            sx={{ marginTop: 0 }}
            error={error.prop == "kmFinal"}
            margin="dense"
            id="kmFinal"
            label="Km Final"
            type="number"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={displacement.kmFinal}
            title="Informe a kilometragem final"
            helperText={error.prop == "kmFinal" && error.message}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth required>
          <TextField
            sx={{ marginTop: 0 }}
            error={error.prop == "observacao"}
            margin="dense"
            id="observacao"
            label="Observação"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={displacement.observacao}
            title="Informe uma observação"
            helperText={error.prop == "observacao" && error.message}
          />
        </FormControl>
      </Grid>

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
  );
}

export default Edit;
