import PageIndex, { NewButtonProps } from "@/src/components/pages";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { VehiclesProps } from "@/src/core/domain/entities/vehicle";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Vehicles() {
  const [data, setData] = useState<VehiclesProps[]>([]);

  const { vehicleUseCases } = useContext(GlobalContext);

  const headers: Array<GridColDef> = [
    { field: "id", headerName: "ID", minWidth: 80, width: 100, flex: 1 },
    { field: "placa", headerName: "Placa", minWidth: 100, width: 100, flex: 1 },
    {
      field: "marcaModelo",
      headerName: "Marca/Modelo",
      minWidth: 140,
      width: 100,
      flex: 1,
    },
    {
      field: "anoFabricacao",
      headerName: "Ano",
      minWidth: 80,
      width: 100,
      flex: 1,
    },
    {
      field: "kmAtual",
      headerName: "Kilometragem",
      minWidth: 100,
      width: 100,
      flex: 1,
    },
  ];

  const router = useRouter();

  const onEdit = (id: number) => () => {
    router.push(`/vehicles/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/vehicles/create`);
  };

  const buttonNew: NewButtonProps = {
    title: "Criar novo veículo",
    variant: "contained",
    color: "primary",
    onClick: onCreate,
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
      color: "error",
    },
  ];

  return (
    <PageIndex
      data={data}
      setData={setData}
      headers={headers}
      useCases={vehicleUseCases}
      buttonNew={buttonNew}
      actionButtons={actionButtons}
    ></PageIndex>
  );
}

export default Vehicles;
