import { IPermission } from "../models"
import { endpoints } from "../config"
import { useAsyncHandler, useResolutionService, useRequestBuilder } from '.'
import { useContext } from "react"
import { PermissionContext } from "../contexts"
import { IPermissionService } from "./interfaces"

const usePermissionService = (): IPermissionService => {
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const permissionContext = useContext(PermissionContext)
  const { permissions, setPermissions } = permissionContext

  const getPermission = (permissionId: number | undefined): IPermission | undefined => {
    return permissions.find(p => p.id === permissionId)
  }

  const addPermission = asyncHandler(async (values: IPermission) => {
    const res = await fetch(endpoints.permissions, requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'permission', [() => addPermissionInContext(json)])
  })

  const updatePermission = asyncHandler(async (values: IPermission, permissionId: number | undefined) => {
    if (!permissionId) throw new Error(`Permission ID not set`)
    
    const res = await fetch(endpoints.permission(permissionId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'permission', [() => updatePermissionInContext(permissionId, values)])
  })

  const deletePermission = asyncHandler(async (permissionId: number | undefined) => {
    if (!permissionId) throw new Error(`Permission ID not set`)

    const res = await fetch(endpoints.permission(permissionId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'permission', [() => deletePermissionInContext(permissionId)])
  })

  const addPermissionInContext = (permission: IPermission) => {
    setPermissions(permissions => [...permissions, permission])
  }

  const updatePermissionInContext = (permissionId: number, values: IPermission) => {
    setPermissions(permissions => {
      return permissions.map(p => {
        return p.id === permissionId ? { ...p, ...values } : p
      })
    })
  }

  const deletePermissionInContext = (permissionId: number) => {
    setPermissions(permissions => permissions.filter(p => p.id !== permissionId))
  }

  return { ...permissionContext, getPermission, addPermission, updatePermission, deletePermission }
}

export default usePermissionService