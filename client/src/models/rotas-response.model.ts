import { IRota } from '.';
export interface IRotaResponse {
  rota: IRota
}
export interface IRotasResponse {
  count: number,
  rotas: IRota[]
}