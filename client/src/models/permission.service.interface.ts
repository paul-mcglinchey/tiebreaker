import { IPermission } from ".";

export interface IPermissionService {
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