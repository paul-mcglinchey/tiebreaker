import { IPermissionContext } from "../../contexts/interfaces"
import { IPermission } from "../../models"

export interface IPermissionService extends IPermissionContext {
  getPermission: (permissionIdentifer: number | undefined) => IPermission | undefined
  addPermission: (values: IPermission) => void
  updatePermission: (values: IPermission, permissionId: string | undefined) => void
  deletePermission: (permissionId: string | undefined) => void
}