import { IGroup } from "./group.model"

export interface IRotaGroup extends IGroup {
  employees?: string[],
  rotas?: string[]
}