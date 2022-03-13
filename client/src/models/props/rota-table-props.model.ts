import { ISortable } from "..";
import { IRota } from "../rota.model";

export interface IRotaTableProps extends ISortable {
  rotas: IRota[],
  count: number,
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}