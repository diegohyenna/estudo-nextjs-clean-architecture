import Table from "@/src/components/table";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { DeleteDisplacementUseCase } from "@/src/core/application/displacement/delete-displacement.use-case";
import { ListDisplacementUseCase } from "@/src/core/application/displacement/list-displacement.use-case";
import { DisplacementsProps } from "@/src/core/domain/entities/displacement";
import { DisplacementHttpGateway } from "@/src/core/infra/gateways/displacement-http.gateway";
import { MotoristHttpGateway } from "@/src/core/infra/gateways/motorist-http.gateway";
import { UserHttpGateway } from "@/src/core/infra/gateways/user-http.gateway";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
import http, { StatusReturn } from "@/src/core/infra/http";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import NoCrashIcon from "@mui/icons-material/NoCrash";
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

function Displacements() {
  const gatewayMotorist = new MotoristHttpGateway(http);
  const gatewayUser = new UserHttpGateway(http);
  const gatewayVehicle = new VehicleHttpGateway(http);
  const gatewayDisplacement = new DisplacementHttpGateway(
    http,
    gatewayMotorist,
    gatewayUser,
    gatewayVehicle
  );
  const useCaseList = new ListDisplacementUseCase(gatewayDisplacement);
  const useCaseDelete = new DeleteDisplacementUseCase(gatewayDisplacement);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<DisplacementsProps[]>([]);

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpenAlert }: any = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const headers = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "motivo", headerName: "Motivo", flex: 1 },
    {
      field: "kmInicial",
      headerName: "Km Inicial",
      flex: 1,
    },
    {
      field: "kmFinal",
      headerName: "Km Final",
      flex: 1,
    },
    {
      field: "inicioDeslocamento",
      headerName: "Início",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.inicioDeslocamento
          ? new Date(params.row.inicioDeslocamento).toLocaleDateString("pt-BR")
          : "",
    },
    {
      field: "fimDeslocamento",
      headerName: "Fim",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.fimDeslocamento
          ? new Date(params.row.fimDeslocamento).toLocaleDateString("pt-BR")
          : "",
    },
    {
      field: "checkList",
      headerName: "Checklist",
      flex: 1,
    },
    {
      field: "observacao",
      headerName: "Observação",
      flex: 1,
    },
    {
      field: "idCliente",
      headerName: "Usuário",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.user ? params.row.user.nome : "",
    },
    {
      field: "idCondutor",
      headerName: "Motorista",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vehicle ? params.row.vehicle.marcaModelo : "",
    },
    {
      field: "idVeiculo",
      headerName: "Veículo",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.motorist ? params.row.motorist.nome : "",
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
    router.push(`/displacements/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/displacements/create`);
  };

  const actionButtons = [
    {
      icon: <NoCrashIcon />,
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
        console.log(res);
        setData(res.map((data) => data.toJSON()));
        setLoading(false);
      })
      .catch((res: StatusReturn) => {
        console.log(res);
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
            title: "Criar novo deslocamento",
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

export default Displacements;
