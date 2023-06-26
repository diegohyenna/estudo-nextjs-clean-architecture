import { Typography, Grid, Button } from "@mui/material";

import { styled } from "@mui/material";
import Link from "next/link";

const GridContainer = styled(Grid)`
  .Paragraphy {
    margin-bottom: 12px;
  }

  .Span {
    font-weight: bold;
  }
`;

export default function About() {
  return (
    <GridContainer container spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Olá, me chamo Diego Guimarães Martins
        </Typography>

        <Typography variant="h6" color="secondary" className="Paragraphy">
          Desenvolvedor Web com foco no front-end
        </Typography>
        <Typography variant="body1" className="Paragraphy">
          Quero convida-los para visitar meu portifólio, onde podem ler tudo a
          meu respeito.
        </Typography>

        <Button
          href="https://dgsite.web.app"
          variant="contained"
          color="primary"
          LinkComponent={Link}
          target="_blank"
        >
          Visite o portifólio aqui
        </Button>
      </Grid>
    </GridContainer>
  );
}
