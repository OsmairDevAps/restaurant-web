export interface IUser {
  id: number;
  name: string;
  user: string;
  password: string;
  kind: string;
}

export interface IAbreCaixa {
  usuario: string;
  saldoinicial: number;
}

export interface IReforcoCaixa {
  descricao: string;
  valor: number;
}

export interface ITransaction {
  id: number;
  data: Date;
  tipo: string;
  descricao: string;
  quant: string;
  valor: number;
}

export interface IMesa {
  id: number;
  num: number;
  status: string;
  cor: string;
}

export interface IPedido {
  id: number;
  idmesa: number;
}

export interface IItemPedido {
  id: number;
  idpedido: number;
  iditem: number;
  quant: number;
  valor: number;
}

export interface IItem {
  id: number;
  descricao: string;
  quant: number;
}

export interface IPagamento {
  id: number;
  idpedido: number;
  datapagamento: Date;
  cliente: string;
  clientedoc: string;
  valordesconto: string;
  valoracrescimo: string;
  valorpago: string;
  obs: string;
}

export interface ICaixa {
  id: number;
  usuario: string;
  situacao: string;
  dataabertura: Date;
  datafechamento: Date;
  saldoinicial: number;
  saldofinal: number;
}

export interface IMovCaixa {
  id: number;
  idcaixa: number;
  datamov: Date;
  tipo: string;         // (venda, reforco, retirada)
  descricao: string;    // (commanda, reforco, etc)
  valor: number;
}

export interface ICategoria {
  id: number;
  descricao: string;
}

export interface IProduto {
  id: number;
  idcategoria: number;
  nome: string;
  valorcusto: number;
  valorfinal: number;
}

export interface IReserva {
  id: number;
  datareserva: Date;
  cliente: string;
  nummesa: string;
  numpessoas: number;
}

export interface IUsuario {
  id: number;
  nome: string;
  nomeusuario: string;
  senha: string;
  tipo: string;
  foto: string;
}