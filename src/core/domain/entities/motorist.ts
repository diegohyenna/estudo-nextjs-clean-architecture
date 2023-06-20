export type MotoristsProps = {
  id?: number;
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
};

export class Motorist {
  constructor(public props: MotoristsProps) {}

  get id() {
    return this.props.id;
  }

  get numeroHabilitacao() {
    return this.props.numeroHabilitacao;
  }

  get categoriaHabilitacao() {
    return this.props.categoriaHabilitacao;
  }

  get vencimentoHabilitacao() {
    return this.props.vencimentoHabilitacao;
  }

  get nome() {
    return this.props.nome;
  }

  toJSON() {
    return {
      ...this.props,
      catergoriaHabilitacao: this.categoriaHabilitacao,
      vencimentoHabilitacao: new Date(this.vencimentoHabilitacao).toISOString(),
    };
  }
}
