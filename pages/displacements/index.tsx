import PageIndex, { NewButtonProps } from "@/src/components/pages";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { DisplacementsProps } from "@/src/core/domain/entities/displacement";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Displacements() {
  const [data, setData] = useState<DisplacementsProps[]>([]);

  const { displacementUseCases } = useContext(GlobalContext);

  const headers: Array<GridColDef> = [
    { field: "id", headerName: "ID", minWidth: 80, width: 100, flex: 1 },
    {
      field: "motivo",
      headerName: "Motivo",
      minWidth: 140,
      width: 100,
      flex: 1,
    },
    {
      field: "kmInicial",
      headerName: "Km Inicial",
      minWidth: 100,
      width: 100,
      flex: 1,
    },
    {
      field: "kmFinal",
      headerName: "Km Final",
      minWidth: 100,
      width: 100,
      flex: 1,
    },
    {
      field: "inicioDeslocamento",
      headerName: "Início",
      minWidth: 140,
      width: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.inicioDeslocamento
          ? new Date(params.row.inicioDeslocamento).toLocaleDateString("pt-BR")
          : "",
    },
    {
      field: "fimDeslocamento",
      headerName: "Fim",
      minWidth: 140,
      width: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.fimDeslocamento
          ? new Date(params.row.fimDeslocamento).toLocaleDateString("pt-BR")
          : "",
    },
    {
      field: "checkList",
      headerName: "Checklist",
      minWidth: 140,
      width: 100,
      flex: 1,
    },
    {
      field: "observacao",
      headerName: "Observação",
      minWidth: 140,
      width: 100,
      flex: 1,
    },
    {
      field: "idCliente",
      headerName: "Usuário",
      minWidth: 140,
      width: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.user ? params.row.user.nome : "",
    },
    {
      field: "idCondutor",
      headerName: "Motorista",
      minWidth: 140,
      width: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.motorist ? params.row.motorist.nome : "",
    },
    {
      field: "idVeiculo",
      headerName: "Veículo",
      minWidth: 140,
      width: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vehicle ? params.row.vehicle.marcaModelo : "",
    },
  ];

  const router = useRouter();

  const onEdit = (id: number) => () => {
    router.push(`/displacements/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/displacements/create`);
  };

  const buttonNew: NewButtonProps = {
    title: "Criar novo deslocamento",
    variant: "contained",
    color: "primary",
    onClick: onCreate,
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
      color: "error",
    },
  ];

  return (
    <PageIndex
      data={data}
      setData={setData}
      headers={headers}
      useCases={displacementUseCases}
      buttonNew={buttonNew}
      actionButtons={actionButtons}
    ></PageIndex>
  );
}

export default Displacements;
