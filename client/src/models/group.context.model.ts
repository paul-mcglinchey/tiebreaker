import { Dispatch, SetStateAction } from "react"
import { IGroup } from "."

export interface IGroupContext {
  groupId: string
  updateGroupId: (groupId: string) => void
  getGroups: () => IGroup[]
  setGroups: Dispatch<SetStateAction<IGroup[]>>
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
}