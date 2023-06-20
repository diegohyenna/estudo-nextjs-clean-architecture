import Table from "@/src/components/table";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { DeleteMotoristUseCase } from "@/src/core/application/motorist/delete-motorist.use-case";
import { ListMotoristUseCase } from "@/src/core/application/motorist/list-motorist.use-case";
import { Motorist, MotoristsProps } from "@/src/core/domain/entities/motorist";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import http, { StatusReturn } from "@/src/core/infra/http";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Motorists() {
  const gateway = new MotoristHttpGateway(http);
  const useCaseList = new ListMotoristUseCase(gateway);
  const useCaseDelete = new DeleteMotoristUseCase(gateway);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<MotoristsProps[]>([]);

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpenAlert }: any = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const headers = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nome", headerName: "Nome", minWidth: 180, flex: 1 },
    {
      field: "numeroHabilitacao",
      headerName: "Nº Habilitação",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "catergoriaHabilitacao",
      headerName: "Categoria",
      flex: 1,
    },
    {
      field: "vencimentoHabilitacao",
      headerName: "Vencimento",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vencimentoHabilitacao
          ? new Date(params.row.vencimentoHabilitacao).toLocaleDateString(
              "pt-BR"
            )
          : "",
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
    router.push(`/motorists/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/motorists/create`);
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
            title: "Criar novo motorista",
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

export default Motorists;
