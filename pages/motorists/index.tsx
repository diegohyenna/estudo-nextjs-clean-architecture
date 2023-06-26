import PageIndex from "@/src/components/pages";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { MotoristsProps } from "@/src/core/domain/entities/motorist";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Motorists() {
  const [data, setData] = useState<MotoristsProps[]>([]);

  const { motoristUseCases } = useContext(GlobalContext);

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

  const router = useRouter();

  const onEdit = (id: number) => () => {
    router.push(`/motorists/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/motorists/create`);
  };

  const buttonNew = {
    title: "Criar novo motorista",
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
      useCases={motoristUseCases}
      buttonNew={buttonNew}
      actionButtons={actionButtons}
    ></PageIndex>
  );
}

export default Motorists;
