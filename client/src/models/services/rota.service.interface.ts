import { IRota } from "..";
import { IRotaContext } from "../contexts";

export interface IRotaService extends IRotaContext {
  getRota       : (
    rotaId: string | undefined
  ) => IRota | undefined
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