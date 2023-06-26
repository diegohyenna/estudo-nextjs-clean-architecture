import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Vehicle } from "@/src/core/domain/entities/vehicle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

function Create() {
  const router = useRouter();

  const { handleOpenAlert, vehicleUseCases } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const obj = new Vehicle(data);
    return vehicleUseCases.useCaseCreate
      .execute(obj)
      .then((res) => {
        router.push("/vehicles").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Sucesso!",
            status: "success",
          });
        });
      })
      .catch((res) => {
        router.push("/vehicles").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
        });
      });
  };

  return (
    <FormCreate
      title="Criar um novo veículo"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
    >
      <>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            margin="dense"
            id="marcaModelo"
            label="Marca/Modelo"
            type="text"
            fullWidth
            title="Digite a marca ou modelo do veiculo"
            error={errors.marcaModelo ? true : false}
            helperText={
              errors.marcaModelo ? (errors.marcaModelo.message as string) : "a"
            }
            {...register("marcaModelo", {
              required: {
                value: true,
                message: "Digite a marca ou modelo do veiculo",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="placa"
            label="Marca/Modelo"
            type="text"
            fullWidth
            title="Digite a placa do veiculo"
            error={errors.placa ? true : false}
            helperText={errors.placa ? (errors.placa.message as string) : ""}
            {...register("placa", {
              required: {
                value: true,
                message: "Digite a placa do veiculo",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="anoFabricacao"
            label="Ano de fabricação"
            type="text"
            fullWidth
            title="Informe o ano de fabricação do veiculo"
            error={errors.anoFabricacao ? true : false}
            helperText={
              errors.anoFabricacao
                ? (errors.anoFabricacao.message as string)
                : ""
            }
            {...register("anoFabricacao", {
              required: {
                value: true,
                message: "Informe o ano de fabricação do veiculo",
              },
              pattern: {
                value: /^\d{4}$/,
                message: "Digite um ano válido!",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            margin="dense"
            id="kmAtual"
            label="Kilometragem"
            type="text"
            fullWidth
            title="Informe a kilometragem do veiculo"
            error={errors.kmAtual ? true : false}
            helperText={
              errors.kmAtual ? (errors.kmAtual.message as string) : ""
            }
            {...register("kmAtual", {
              required: {
                value: true,
                message: "Informe a kilometragem do veiculo",
              },
            })}
          />
        </Grid>
      </>
    </FormCreate>
  );
}

export default Create;
