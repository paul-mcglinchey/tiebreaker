import { Dispatch, SetStateAction } from "react"
import { IPermission } from "../../models"

export interface IPermissionContext {
  permissions: IPermission[]
  setPermissions: Dispatch<SetStateAction<IPermission[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
}