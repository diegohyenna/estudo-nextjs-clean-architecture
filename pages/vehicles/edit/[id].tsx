import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { GetVehicleUseCase } from "@/src/core/application/use-cases/vehicle/get-vehicle.use-case";
import { UpdateVehicleUseCase } from "@/src/core/application/use-cases/vehicle/update-vehicle.use-case";
import { Vehicle, VehiclesProps } from "@/src/core/domain/entities/vehicle";
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

  const [vehicle, setVehicle] = useState<VehiclesProps>({
    placa: "",
    anoFabricacao: 0,
    kmAtual: 0,
    marcaModelo: "",
  });

  const id = router.query?.id ? +router.query.id : 0;

  const gateway = new VehicleHttpGateway(http);
  const useCaseGet = new GetVehicleUseCase(gateway);
  const useCaseUpdate = new UpdateVehicleUseCase(gateway);

  const getByIdPromise = (id: number) => {
    return new Promise((resolve, reject) => {
      useCaseGet
        .execute(id)
        .then(async (res) => {
          const vehicle = await res.toJSON();
          setVehicle(vehicle);
          resolve(true);
        })
        .catch((res) => {
          router.push("/vehicles").then(() => {
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
      const data = new Vehicle({ ...vehicle });
      useCaseUpdate
        .execute(id, data)
        .then((res) => {
          router.push("/vehicles").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Sucesso!",
              status: "success",
            });
            return resolve(true);
          });
        })
        .catch((res) => {
          router.push("/vehicles").then(() => {
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
    setVehicle({ ...vehicle, [e.id]: e.value });
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
            margin="dense"
            id="marcaModelo"
            label="Marca/Modelo"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={vehicle.marcaModelo}
            title="Digite a marca ou modelo do veiculo"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            disabled
            margin="dense"
            id="placa"
            label="Placa"
            type="text"
            fullWidth
            value={vehicle.placa}
            title="Digite a placa do veiculo"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            required
            margin="dense"
            id="anoFabricacao"
            label="Ano de fabricação"
            type="number"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={vehicle.anoFabricacao}
            title="Informe o ano de fabricação do veiculo"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="kmAtual"
            label="Kilometragem"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={vehicle.kmAtual}
            title="Informe a kilometragem do veiculo"
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
