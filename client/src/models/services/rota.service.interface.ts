import { IRota } from "..";
import { IRotaContext } from "../contexts";
import { IEmployee } from "../employee.model";

export interface IRotaService extends IRotaContext {
  getRota       : (
    rotaId: string | undefined
  ) => IRota | undefined
  getRotaEmployees: (
    rota: IRota | undefined
  ) => IEmployee[]
  addRota       : (
    values: IRota, 
    groupId: string | undefined
  ) => void,
  updateRota    : (
    values: IRota, 
    rotaId: string | undefined, 
    groupId: string | undefined
  ) => void,
  deleteRota    : (
    rotaId: string | undefined, 
    groupId: string | undefined
  ) => void
}