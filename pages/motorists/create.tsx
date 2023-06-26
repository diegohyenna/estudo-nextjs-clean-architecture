import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Motorist } from "@/src/core/domain/entities/motorist";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

function Create() {
  const router = useRouter();

  const { handleOpenAlert, motoristUseCases } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const obj = new Motorist(data);
    return motoristUseCases.useCaseCreate
      .execute(obj)
      .then((res) => {
        router.push("/motorists").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Sucesso!",
            status: "success",
          });
        });
      })
      .catch((res) => {
        router.push("/motorists").then(() => {
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

  return (
    <FormCreate
      title="Criar um novo motorista"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
    >
      <>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            title="Digite o nome do motorista"
            error={errors.nome ? true : false}
            helperText={errors.nome ? (errors.nome.message as string) : ""}
            {...register("nome", {
              required: {
                value: true,
                message: "Digite o nome do motorista",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="categoriaHabilitacao"
            label="Categoria da habilitação"
            type="text"
            fullWidth
            title="Digite a categoria da habilitação"
            error={errors.categoriaHabilitacao ? true : false}
            helperText={
              errors.categoriaHabilitacao
                ? (errors.categoriaHabilitacao.message as string)
                : ""
            }
            {...register("categoriaHabilitacao", {
              required: {
                value: true,
                message: "Digite a categoria da habilitação",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="numeroHabilitacao"
            label="Nº da Habilitação"
            type="number"
            fullWidth
            title="Informe o número da habilitação"
            error={errors.numeroHabilitacao ? true : false}
            helperText={
              errors.numeroHabilitacao
                ? (errors.numeroHabilitacao.message as string)
                : ""
            }
            {...register("numeroHabilitacao", {
              required: {
                value: true,
                message: "Digite o número da habilitação",
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="vencimentoHabilitacao"
            label="Vencimento da habilitação"
            type="text"
            fullWidth
            title="Informe o vencimento da habilitação"
            onFocus={(e) => onFocus(e.target)}
            onBlurCapture={(e) => onBlur(e.target)}
            error={errors.vencimentoHabilitacao ? true : false}
            helperText={
              errors.vencimentoHabilitacao
                ? (errors.vencimentoHabilitacao.message as string)
                : ""
            }
            {...register("vencimentoHabilitacao", {
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
      </>
    </FormCreate>
  );
}

export default Create;
