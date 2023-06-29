import { Typography, Grid, Divider, Button } from "@mui/material";

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

export default function Home() {
  return (
    <GridContainer container spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Olá, me chamo Diego Guimarães Martins
        </Typography>
        <Typography variant="body1" className="Paragraphy">
          Quero compartilhar com vocês alguns pensamentos e decisões sobre o
          desenvolvimento do projeto
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h5">Primeiro</Typography>
        <Typography variant="body1" className="Paragraphy">
          Eu não domino muito o <span className="Span">Nextjs</span>, tudo que
          fiz foi aprendido durante essas duas semanas. Componentizei e
          reutilizei o máximo que meu conhecimento permitiu. Sobre o{" "}
          <span className="Span">Material UI</span>, eu também não tenho muita
          expertise, então não foquei muito em um layout bem elaborado.
        </Typography>
        <Typography variant="body1" className="Paragraphy">
          <span className="Span">Optei por meu projeto ter um diferencial</span>
          , algo que fugisse da caixinha, visto que pude observar que são muitos
          candidatos na vaga. Então resolvi aplicar conceitos de uma arquitetura
          de software. Resolvi{" "}
          <span className="Span">separar a regra de negocio da aplicação</span>.
          Para isso implementei uma versão da{" "}
          <span className="Span">Clean Architecture</span>, baseado em um rápido
          estudo.
        </Typography>

        <Typography variant="h5">Segundo</Typography>
        <Typography variant="body1" className="Paragraphy">
          Em se tratando de testes, eu não uso e não conheço o{" "}
          <span className="Span">Jest</span>, por isso não apliquei. Já usei
          testes com Jasmine no Angular. Não é difícil para mim aprender, só
          exigirá uma mudança de cultura no meu desenvolvimento que seria algo
          orientado a testes, daí o uso e estudo de{" "}
          <span className="Span">TDD</span>
        </Typography>

        <Typography variant="h5">Concluindo</Typography>
        <Typography variant="body1" className="Paragraphy">
          Enfim, nessas duas semanas pude aprender muito e aplicar conceitos que
          tenho me interessado em aprender.{" "}
          <span className="Span">
            Imaginem o que posso fazer em tempo indeterminado na empresa?
          </span>
        </Typography>

        <Divider sx={{ margin: "24px 0" }} />

        <Typography variant="h5">Repositorio do Projeto</Typography>
        <Button
          href="https://github.com/diegohyenna/teste-naty"
          target="_blank"
          LinkComponent={Link}
          variant="outlined"
        >
          Visite aqui
        </Button>

        <Divider sx={{ margin: "24px 0" }} />

        <Typography variant="h5">Tecnologias Usadas no Projeto</Typography>
        <ul>
          <li>Nextjs</li>
          <li>Typescript</li>
          <li>Material UI</li>
          <li>React Hook Form</li>
          <li>Axios</li>
          <li>React Number Format</li>
        </ul>

        <Divider sx={{ margin: "24px 0" }} />

        <Typography variant="h5">Sobre mim</Typography>
        <Button href="/about" LinkComponent={Link} variant="outlined">
          Visite aqui
        </Button>
      </Grid>
    </GridContainer>
  );
}
