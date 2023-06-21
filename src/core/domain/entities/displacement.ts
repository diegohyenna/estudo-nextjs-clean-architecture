import { Motorist } from "./motorist";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export type DisplacementsProps = {
  id?: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
  motorist?: Motorist;
  vehicle?: Vehicle;
  user?: User;
};

export class Displacement {
  constructor(public props: DisplacementsProps) {}

  get id() {
    return this.props.id;
  }

  get kmInicial() {
    return this.props.kmInicial;
  }

  get kmFinal() {
    return this.props.kmFinal;
  }

  get inicioDeslocamento() {
    return this.props.inicioDeslocamento;
  }

  get fimDeslocamento() {
    return this.props.fimDeslocamento;
  }

  get checkList() {
    return this.props.checkList;
  }

  get motivo() {
    return this.props.motivo;
  }

  get observacao() {
    return this.props.observacao;
  }

  get idCondutor() {
    return this.props.idCondutor;
  }

  get idVeiculo() {
    return this.props.idVeiculo;
  }

  get idCliente() {
    return this.props.idCliente;
  }

  get motorist() {
    return this.props.motorist;
  }

  get user() {
    return this.props.user;
  }

  get vehicle() {
    return this.props.vehicle;
  }

  addMotorist(motorist: Motorist) {
    this.props.motorist = motorist;
  }

  addVehicle(vehicle: Vehicle) {
    this.props.vehicle = vehicle;
  }

  addUser(user: User) {
    this.props.user = user;
  }

  toJSON(): DisplacementsProps {
    return {
      ...this.props,
      inicioDeslocamento: this.inicioDeslocamento
        ? new Date(this.inicioDeslocamento).toISOString()
        : "",
      fimDeslocamento: this.fimDeslocamento
        ? new Date(this.fimDeslocamento).toISOString()
        : "",
    };
  }
}
