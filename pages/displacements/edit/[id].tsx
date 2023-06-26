import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Displacement } from "@/src/core/domain/entities/displacement";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert, displacementUseCases } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const id = router.query?.id ? +router.query.id : 0;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getUserById = () => {
    return displacementUseCases.useCaseGet
      .execute(id)
      .then(async (res) => {
        setLoading(true);
        const displacement: any = await res.toJSON();

        for (let prop in displacement) {
          setValue(prop, displacement[prop]);
        }

        return Promise.resolve(true);
      })
      .catch((res) => {
        router.push("/displacements").then(() => {
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
    const obj = new Displacement(data);

    return displacementUseCases.useCaseUpdate
      .execute(id, obj)
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

  return (
    <FormCreate
      title="Encerrar o deslocamento"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
      useEffects={{ action: getUserById, dependencyArray: [id, loading] }}
    >
      <>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            margin="dense"
            id="fimDeslocamento"
            label="Início deslocamento"
            type="text"
            fullWidth
            title="Informe o fim do deslocamento"
            onFocus={(e) => onFocus(e.target)}
            onBlurCapture={(e) => onBlur(e.target)}
            error={errors.fimDeslocamento ? true : false}
            helperText={
              errors.fimDeslocamento ? errors.fimDeslocamento.message : ""
            }
            {...register("fimDeslocamento", {
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
            id="kmFinal"
            label="Km Final"
            type="number"
            fullWidth
            title="Informe a kilometragem inicial"
            // onChange={(e) => onChange(e.target)}
            error={errors.kmFinal ? true : false}
            helperText={errors.kmFinal ? errors.kmFinal.message : ""}
            {...register("kmFinal", {
              required: {
                value: true,
                message: "Digite a kilometragem final!",
              },
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

export default Edit;
