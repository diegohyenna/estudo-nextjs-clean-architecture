export type UsersProps = {
  id?: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export class User {
  constructor(public props: UsersProps) {}

  get id() {
    return this.props.id;
  }

  get numeroDocumento() {
    return this.props.numeroDocumento;
  }

  get tipoDocumento() {
    return this.props.tipoDocumento;
  }

  get nome() {
    return this.props.nome;
  }

  get logradouro() {
    return this.props.logradouro;
  }

  get numero() {
    return this.props.numero;
  }

  get bairro() {
    return this.props.bairro;
  }

  get cidade() {
    return this.props.cidade;
  }

  get uf() {
    return this.props.uf;
  }

  toJSON() {
    return {
      ...this.props,
    };
  }
}
