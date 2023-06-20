export type VehiclesProps = {
  id?: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
};

export class Vehicle {
  constructor(public props: VehiclesProps) {}

  get id() {
    return this.props.id;
  }

  get placa() {
    return this.props.placa;
  }

  get marcaModelo() {
    return this.props.marcaModelo;
  }

  get anoFabricacao() {
    return this.props.anoFabricacao;
  }

  get kmAtual() {
    return this.props.kmAtual;
  }

  toJSON() {
    return {
      ...this.props,
    };
  }
}
