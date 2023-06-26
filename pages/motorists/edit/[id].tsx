import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Motorist } from "@/src/core/domain/entities/motorist";
import { formatDate } from "@/src/utils/helpers";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert, motoristUseCases } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const id = router.query?.id ? +router.query.id : 0;

  const [loading, setLoading] = useState(true);

  const getUserById = () => {
    return motoristUseCases.useCaseGet
      .execute(id)
      .then(async (res) => {
        setLoading(true);
        const motorist: any = await res.toJSON();

        for (let prop in motorist) {
          setValue(prop, motorist[prop]);
        }

        //tem um erro de digitação na API, tive que consertar assim
        setValue("categoriaHabilitacao", motorist["catergoriaHabilitacao"]);

        const newDate = new Date(motorist["vencimentoHabilitacao"]);

        setValue("vencimentoHabilitacao", formatDate(newDate));

        return Promise.resolve(true);
      })
      .catch((res) => {
        router.push("/motorists").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
          return Promise.reject();
        });
      });
  };

  const onSubmit = (data: any) => {
    const obj = new Motorist(data);

    return motoristUseCases.useCaseUpdate
      .execute(id, obj)
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
      title="Editar o motorista"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
      useEffects={{ action: getUserById, dependencyArray: [id, loading] }}
    >
      <>
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
            id="vencimentoHabilitacao"
            label="Vencimento da habilitação"
            type="date"
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

export default Edit;
