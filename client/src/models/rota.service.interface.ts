import { IRotaContext, IRota, IEmployee } from "."

export interface IRotaService extends IRotaContext {
  getRota: (rotaId: string | undefined) => IRota | undefined
  getRotaEmployees: (rota: IRota | undefined) => IEmployee[]
  addRota: (values: IRota) => void,
  updateRota: (rotaId: string | undefined, values: IRota) => void,
  deleteRota: (rotaId: string | undefined) => void
}