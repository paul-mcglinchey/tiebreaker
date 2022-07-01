import { IPermission, IPermissionContext } from ".";

export interface IPermissionService extends IPermissionContext {
  getPermission: (permissionIdentifer: string | undefined) => IPermission | undefined
  addPermission     : (
    values: IPermission
  ) => void
  updatePermission  : (
    values: IPermission, 
    permissionId: string | undefined
  ) => void
  deletePermission  : (
    permissionId: string | undefined
  ) => void
}