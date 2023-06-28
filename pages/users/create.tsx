import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { User } from "@/src/core/domain/entities/user";
import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type FormatMaskProps = {
  prop: string;
  format: "tipoDocumento" | "";
};

function Create() {
  const router = useRouter();

  const { handleOpenAlert, userUseCases } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const [formatMask, setFormatMask] = useState<FormatMaskProps>({
    prop: "",
    format: "",
  });

  const maskTipoDocumento = (value: any) =>
    value == "CPF"
      ? "###.###.###-##"
      : value == "CNPJ"
      ? "##.###.###/####-##"
      : "";

  const formats: any = { tipoDocumento: maskTipoDocumento };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const obj = new User(data);

    return userUseCases.useCaseCreate
      .execute(obj)
      .then((res) => {
        router.push("/users").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Sucesso!",
            status: "success",
          });
        });
      })
      .catch((res) => {
        router.push("/users").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
        });
      });
  };

  const tipoDocumentoProp = watch("tipoDocumento");

  useEffect(() => {
    let prop = "tipoDocumento";
    let propValue = tipoDocumentoProp;

    if (propValue && formats[prop]) {
      setFormatMask({
        prop,
        format: formats[prop](propValue),
      });
    }
  }, [tipoDocumentoProp]);

  return (
    <FormCreate
      title="Criar um novo usuário"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
    >
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          margin="dense"
          id="nome"
          label="Nome"
          type="text"
          fullWidth
          title="Informe o nome do usuario"
          error={errors.nome ? true : false}
          helperText={errors.nome ? (errors.nome.message as string) : ""}
          {...register("nome", {
            required: {
              value: true,
              message: "Digite o nome",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          sx={{ marginTop: "8px", marginBottom: "4px" }}
          id="tipoDocumento"
          label="Selecione o Tipo de documento"
          select
          fullWidth
          defaultValue=""
          error={errors.tipoDocumento ? true : false}
          helperText={
            errors.tipoDocumento ? (errors.tipoDocumento.message as string) : ""
          }
          {...register("tipoDocumento", {
            required: {
              value: true,
              message: "Digite o tipo do documento",
            },
          })}
        >
          {["CPF", "CNPJ"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Controller
          name="numeroDocumento"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Digite o número do documento",
            },
            pattern: {
              value:
                /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
              message: "Digite um número válido",
            },
          }}
          render={({ field }) => (
            <PatternFormat
              format={
                formatMask.prop == "tipoDocumento" ? formatMask.format : ""
              }
              mask="_"
              {...field}
              disabled={!tipoDocumentoProp}
              customInput={TextField}
              margin="dense"
              type="text"
              fullWidth
              title="Informe o numero do documento"
              error={errors.numeroDocumento ? true : false}
              helperText={
                errors.numeroDocumento
                  ? (errors.numeroDocumento.message as string)
                  : ""
              }
            />
          )}
        ></Controller>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="logradouro"
          label="Logradouro"
          type="text"
          fullWidth
          title="Informe o logradouro do endereço"
          error={errors.logradouro ? true : false}
          helperText={
            errors.logradouro ? (errors.logradouro.message as string) : ""
          }
          {...register("logradouro", {
            required: {
              value: true,
              message: "Digite o logradouro do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="numero"
          label="Número"
          type="text"
          fullWidth
          title="Informe o numero do endereço"
          error={errors.numero ? true : false}
          helperText={errors.numero ? (errors.numero.message as string) : ""}
          {...register("numero", {
            required: {
              value: true,
              message: "Digite o número do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="bairro"
          label="Bairro"
          type="text"
          fullWidth
          title="Informe o bairro do endereço"
          error={errors.bairro ? true : false}
          helperText={errors.bairro ? (errors.bairro.message as string) : ""}
          {...register("bairro", {
            required: {
              value: true,
              message: "Digite o bairro do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="cidade"
          label="Cidade"
          type="text"
          fullWidth
          title="Informe a cidade do endereço"
          error={errors.cidade ? true : false}
          helperText={errors.cidade ? (errors.cidade.message as string) : ""}
          {...register("cidade", {
            required: {
              value: true,
              message: "Digite a cidade do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="uf"
          label="Estado"
          type="text"
          fullWidth
          title="Informe o estado do endereço"
          error={errors.uf ? true : false}
          helperText={errors.uf ? (errors.uf.message as string) : ""}
          {...register("uf", {
            required: {
              value: true,
              message: "Digite o estado do endereço",
            },
          })}
        />
      </Grid>
    </FormCreate>
  );
}

export default Create;
