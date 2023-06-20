import Table from "@/src/components/table";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import http, { StatusReturn } from "@/src/core/infra/http";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { ListUserUseCase } from "@/src/core/application/user/list-user.use-case";
import { DeleteUserUseCase } from "@/src/core/application/user/delete-user.use-case";
import { User, UsersProps } from "@/src/core/domain/entities/user";
import { CircularProgress, ListItem } from "@mui/material";

function Users() {
  const gateway = new UserHttpGateway(http);
  const useCaseList = new ListUserUseCase(gateway);
  const useCaseDelete = new DeleteUserUseCase(gateway);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<UsersProps[]>([]);

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpenAlert }: any = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const headers = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
    {
      field: "numeroDocumento",
      headerName: "Nº Doc",
      flex: 1,
    },
    {
      field: "tipoDocumento",
      headerName: "Tipo Doc",
      flex: 1,
    },
    {
      field: "logradouro",
      headerName: "Logradouro",
      flex: 1,
    },
    {
      field: "numero",
      headerName: "Número",
      flex: 1,
    },
    {
      field: "bairro",
      headerName: "Bairro",
      flex: 1,
    },
    {
      field: "cidade",
      headerName: "Cidade",
      flex: 1,
    },
    {
      field: "uf",
      headerName: "Estado",
      flex: 1,
    },
  ];

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id: number) => () => {
    setId(id);
    setOpenDialog(true);
  };

  const onEdit = (id: number) => () => {
    router.push(`/users/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/users/create`);
  };

  const actionButtons = [
    {
      icon: <EditIcon />,
      label: "editar",
      action: onEdit,
      color: "info",
    },
    {
      icon: <DeleteIcon />,
      label: "deletar",
      action: handleOpenDialog,
      color: "error",
    },
  ];

  const handleSubmitDialog = () => {
    useCaseDelete
      .execute(id)
      .then((res) => {
        setData(data.filter((dt: any) => dt.id !== id));
        handleOpenAlert({
          open: true,
          message: res?.message || "Sucesso!",
          status: "success",
        });
      })
      .catch((res) => {
        handleOpenAlert({
          open: true,
          message: res?.message || "Houve algum erro",
          status: "error",
        });
      });
    setOpenDialog(false);
  };

  useEffect(() => {
    useCaseList
      .execute()
      .then((res) => {
        setData(res.map((data) => data.toJSON()));
        setLoading(false);
      })
      .catch((res: StatusReturn) => {
        setData([]);
        setLoading(false);
        handleOpenAlert({ open: true, status: "error", message: res.message });
      });
  }, []);

  return (
    <>
      {loading && (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )}
      {!loading && (
        <Table
          data={data}
          headers={headers}
          actionButtons={actionButtons}
          buttonNew={{
            title: "Criar novo usuario",
            variant: "contained",
            color: "primary",
            onClick: onCreate,
          }}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Deletar registro!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmitDialog}
          >
            Sim
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Users;
