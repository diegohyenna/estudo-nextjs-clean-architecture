import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { GetMotoristUseCase } from "@/src/core/application/motorist/get-motorist.use-case";
import { UpdateMotoristUseCase } from "@/src/core/application/motorist/update-motorist.use-case";
import { GetVehicleUseCase } from "@/src/core/application/vehicle/get-vehicle.use-case";
import { UpdateVehicleUseCase } from "@/src/core/application/vehicle/update-vehicle.use-case";
import { Motorist, MotoristsProps } from "@/src/core/domain/entities/motorist";
import { Vehicle, VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http from "@/src/core/infra/http";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert } = useContext(GlobalContext);

  const [motorist, setMotorist] = useState<MotoristsProps>({
    catergoriaHabilitacao: "",
    categoriaHabilitacao: "",
    nome: "",
    numeroHabilitacao: "",
    vencimentoHabilitacao: "",
  });

  const id = router.query?.id ? +router.query.id : 0;

  const gateway = new MotoristHttpGateway(http);
  const useCaseGet = new GetMotoristUseCase(gateway);
  const useCaseUpdate = new UpdateMotoristUseCase(gateway);

  const getByIdPromise = (id: number) => {
    return new Promise((resolve, reject) => {
      useCaseGet
        .execute(id)
        .then(async (res) => {
          const vehicle = await res.toJSON();

          const dataFormat = {
            ...vehicle,
            categoriaHabilitacao: vehicle.catergoriaHabilitacao || "",
            vencimentoHabilitacao: vehicle.vencimentoHabilitacao
              ? new Date(vehicle.vencimentoHabilitacao).toLocaleDateString(
                  "pt-BR"
                )
              : "",
          };
          setMotorist(dataFormat);
          resolve(true);
        })
        .catch((res) => {
          router.push("/motorists").then(() => {
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

  const handleSubmitPromise = () => {
    return new Promise((resolve, reject) => {
      const data = new Motorist(motorist);

      useCaseUpdate
        .execute(id, data)
        .then((res) => {
          router.push("/motorists").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Sucesso!",
              status: "success",
            });
            return resolve(true);
          });
        })
        .catch((res) => {
          router.push("/motorists").then(() => {
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
    setMotorist({ ...motorist, [e.id]: e.value });
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
      title="Editar o veículo"
      handleSubmitPromise={handleSubmitPromise}
      id={id}
      getByIdPromise={getByIdPromise}
    >
      <Grid item xs={12} sm={12} md={12}>
        <Item>
          <TextField
            required
            disabled
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            value={motorist.nome}
            title="Digite o nome do motorista"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            required
            margin="dense"
            id="categoriaHabilitacao"
            label="Categoria da habilitação"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={motorist.categoriaHabilitacao}
            title="Digite a categoria da habilitação"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            required
            disabled
            margin="dense"
            id="numeroHabilitacao"
            label="Nº da Habilitação"
            type="number"
            fullWidth
            value={motorist.numeroHabilitacao}
            title="Informe o número da habilitação"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="vencimentoHabilitacao"
            label="Vencimento habilitação"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={motorist.vencimentoHabilitacao}
            title="Informe o vencimento da habilitação"
            placeholder=""
            onFocus={(e) => onFocus(e.target)}
            onBlur={(e) => onBlur(e.target)}
          />
        </Item>
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
