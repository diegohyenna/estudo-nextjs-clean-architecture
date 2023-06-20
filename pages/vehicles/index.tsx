import Table from "@/src/components/table";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { DeleteVehicleUseCase } from "@/src/core/application/vehicle/delete-vehicle.use-case";
import { ListVehicleUseCase } from "@/src/core/application/vehicle/list-vehicle.use-case";
import { Vehicle, VehiclesProps } from "@/src/core/domain/entities/vehicle";
import { VehicleHttpGateway } from "@/src/core/infra/gateways/vehicle-http.gateway";
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
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Vehicles() {
  const gateway = new VehicleHttpGateway(http);
  const useCaseList = new ListVehicleUseCase(gateway);
  const useCaseDelete = new DeleteVehicleUseCase(gateway);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<VehiclesProps[]>([]);

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpenAlert }: any = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const headers = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "placa", headerName: "Placa", minWidth: 180, flex: 1 },
    {
      field: "marcaModelo",
      headerName: "Marca/Modelo",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "anoFabricacao",
      headerName: "Ano",
      flex: 1,
    },
    {
      field: "kmAtual",
      headerName: "Kilometragem",
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
    router.push(`/vehicles/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/vehicles/create`);
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
            title: "Criar novo veiculo",
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

export default Vehicles;
