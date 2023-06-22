import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { ListMotoristUseCase } from "@/src/core/application/use-cases/motorist/list-motorist.use-case";
import { ListUserUseCase } from "@/src/core/application/use-cases/user/list-user.use-case";
import { ListVehicleUseCase } from "@/src/core/application/use-cases/vehicle/list-vehicle.use-case";
import { Displacement } from "@/src/core/domain/entities/displacement";
import { MotoristsProps } from "@/src/core/domain/entities/motorist";
import { UsersProps } from "@/src/core/domain/entities/user";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http from "@/src/core/infra/http";
import {
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

type FormProps = {
  useEffects: {
    action: any;
    dependencyArray: Array<any>;
  };
  onSubmit: any;
  title: string;
  children: any;
};

function FormCreate({ useEffects, onSubmit, title, children }: FormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useEffects
      .action()
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
      });
  }, [...useEffects.dependencyArray]);

  // const onChange = (e: any) => {
  //   setError({ prop: "", message: "" });
  //   setDisplacement({ ...displacement, [e.id]: e.value });
  // };

  // const onChangeSelect = (props: any, a: any) => {
  //   console.log(props);
  //   // setDisplacement({ ...displacement, [props]: e.value });
  // };

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
