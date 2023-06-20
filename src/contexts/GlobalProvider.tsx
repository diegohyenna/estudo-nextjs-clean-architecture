import React, { createContext, useState } from "react";

export type Alert = {
  open: boolean;
  status: string;
  message: string;
};

export type GlobalValues = {
  alert: Alert;
  handleOpenAlert: Function;
  handleCloseAlert: Function;
};

export const GlobalContext = createContext<GlobalValues>({
  alert: { open: false, message: "", status: "" },
  handleOpenAlert: Function,
  handleCloseAlert: Function,
});

export const GlobalProvider = ({ children }: any) => {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    status: "",
    message: "",
  });

  const handleOpenAlert = ({ status, message }: Alert) => {
    setAlert({ open: true, status, message });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, status: "", message: "" });
  };

  return (
    <GlobalContext.Provider
      value={{ alert, handleOpenAlert, handleCloseAlert }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
