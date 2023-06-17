import getBaseUrl from "@/src/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export type Users = {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type Status = {
  statusCode: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;

    switch (method) {
      case "GET":
        const users = await fetch(getBaseUrl() + "/Cliente").then((res) =>
          res.json()
        );
        res.status(200).json(users);
        break;

      case "POST":
        break;

      default:
        res.status(405).json({
          statusCode: 405,
          message: `Metodo ${method} não permitido!`,
        });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
