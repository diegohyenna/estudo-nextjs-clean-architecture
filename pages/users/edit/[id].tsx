import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import http from "@/src/core/infra/http";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import FormCreate from "@/src/components/forms/create";
import { User, UsersProps } from "@/src/core/domain/entities/user";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { GetUserUseCase } from "@/src/core/application/user/get-user.use-case";
import { UpdateUserUseCase } from "@/src/core/application/user/update-user.use-case";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert } = useContext(GlobalContext);

  const [user, setUser] = useState<UsersProps>({
    bairro: "",
    cidade: "",
    logradouro: "",
    nome: "",
    numero: "",
    numeroDocumento: "",
    tipoDocumento: "",
    uf: "",
  });

  const id = router.query?.id ? +router.query.id : 0;

  const gateway = new UserHttpGateway(http);
  const useCaseGet = new GetUserUseCase(gateway);
  const useCaseUpdate = new UpdateUserUseCase(gateway);

  const getByIdPromise = (id: number) => {
    return new Promise((resolve, reject) => {
      useCaseGet
        .execute(id)
        .then(async (res) => {
          const user = await res.toJSON();
          setUser(user);
          resolve(true);
        })
        .catch((res) => {
          router.push("/users").then(() => {
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
      const data = new User({ ...user });
      useCaseUpdate
        .execute(id, data)
        .then((res) => {
          router.push("/users").then(() => {
            handleOpenAlert({
              open: true,
              message: res?.message || "Sucesso!",
              status: "success",
            });
            return resolve(true);
          });
        })
        .catch((res) => {
          router.push("/users").then(() => {
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
    setUser({ ...user, [e.id]: e.value });
  };

  return (
    <FormCreate
      title="Editar o usuário"
      handleSubmitPromise={handleSubmitPromise}
      id={id}
      getByIdPromise={getByIdPromise}
    >
      <Grid item xs={12} sm={12} md={12}>
        <Item>
          <TextField
            required
            margin="dense"
            id="nome"
            label="Seu nome"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.nome}
            title="Digite o seu nome"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            required
            disabled
            margin="dense"
            id="tipoDocumento"
            label="Tipo de Documento"
            type="text"
            fullWidth
            value={user.tipoDocumento}
            title="Informe o tipo do documento"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item>
          <TextField
            required
            disabled
            margin="dense"
            id="numeroDocumento"
            label="Numero do Documento"
            type="text"
            fullWidth
            value={user.numeroDocumento}
            title="Informe o numero do documento"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="logradouro"
            label="Logradouro"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.logradouro}
            title="Informe o logradouro do endereço"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="numero"
            label="Número"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.numero}
            title="Informe o numero do endereço"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="bairro"
            label="Bairro"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.bairro}
            title="Informe o bairro do endereço"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="cidade"
            label="Cidade"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.cidade}
            title="Informe a cidade do endereço"
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Item>
          <TextField
            required
            margin="dense"
            id="uf"
            label="Estado"
            type="text"
            fullWidth
            onChange={(e) => onChange(e.target)}
            value={user.uf}
            title="Informe o estado do endereço"
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
