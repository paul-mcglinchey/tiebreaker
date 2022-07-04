import { Dispatch, SetStateAction } from "react"
import { IGroup } from "../../models"

export interface IGroupContext {
  currentGroup: IGroup | undefined
  setCurrentGroup: Dispatch<SetStateAction<IGroup | undefined>>
  groups: IGroup[]
  setGroups: Dispatch<SetStateAction<IGroup[]>>
  count: number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
}