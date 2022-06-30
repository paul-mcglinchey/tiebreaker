import { Dispatch, SetStateAction } from "react"
import { IPermission } from "."

export interface IPermissionContext {
  permissions: IPermission[]
  setPermissions: Dispatch<SetStateAction<IPermission[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
}