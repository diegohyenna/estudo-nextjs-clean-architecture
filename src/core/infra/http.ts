import axios from "axios";

export type StatusReturn = {
  status: number;
  message: string;
};

const api = axios.create({
  baseURL: "https://api-deslocamento.herokuapp.com/api/v1",
  headers: { "Content-Type": "application/json" },
});

export default api;
