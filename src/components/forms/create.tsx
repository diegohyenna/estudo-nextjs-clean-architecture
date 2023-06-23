import { CircularProgress, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

type FormProps = {
  useEffects?: {
    action: any;
    dependencyArray?: Array<any>;
  };
  onSubmit: any;
  title: string;
  children: any;
  loading: boolean;
  setLoading: any;
};

function FormCreate({
  useEffects,
  onSubmit,
  title,
  children,
  loading = false,
  setLoading,
}: FormProps) {
  const router = useRouter();

  useEffects
    ? useEffect(() => {
        let dependencyArrayValidation = useEffects?.dependencyArray
          ? useEffects.dependencyArray?.map((items) => items != 0)
          : [];

        if (
          useEffects?.action &&
          useEffects?.dependencyArray?.length &&
          !dependencyArrayValidation?.includes(false)
        ) {
          useEffects
            ?.action()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
        }
      }, [useEffects.dependencyArray])
    : setLoading(false);

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Divider>
            <Typography variant="h4">{title}</Typography>
          </Divider>
          {loading && (
            <Item>
              <CircularProgress />
            </Item>
          )}
        </Grid>

        {!loading && <>{children}</>}

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
      </Grid>
    </form>
  );
}

export default FormCreate;
