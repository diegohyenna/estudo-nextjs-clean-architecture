import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>A página não foi encontrada ou não existe</p>
      <Button onClick={() => router.back()}>Voltar</Button>
    </>
  );
}
