import { IRotaContext } from "../../contexts/interfaces"
import { IRota, IEmployee } from "../../models"

export interface IRotaService extends IRotaContext {
  getRota: (rotaId: string | undefined) => IRota | undefined
  getRotaEmployees: (rota: IRota | undefined) => IEmployee[]
  addRota: (values: IRota) => void,
  updateRota: (rotaId: string | undefined, values: IRota) => void,
  deleteRota: (rotaId: string | undefined) => void
}