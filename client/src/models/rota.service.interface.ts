import { IRotaContext, IRota, IEmployee } from "."

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