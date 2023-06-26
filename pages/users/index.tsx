import PageIndex, { NewButtonProps } from "@/src/components/pages";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { UsersProps } from "@/src/core/domain/entities/user";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState<UsersProps[]>([]);

  const { userUseCases } = useContext(GlobalContext);

  const headers: Array<GridColDef> = [
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

  const router = useRouter();

  const onEdit = (id: number) => () => {
    router.push(`/users/edit/${id}`);
  };

  const onCreate = () => {
    router.push(`/users/create`);
  };

  const buttonNew: NewButtonProps = {
    title: "Criar novo usuário",
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
      useCases={userUseCases}
      buttonNew={buttonNew}
      actionButtons={actionButtons}
    ></PageIndex>
  );
}

export default Users;
