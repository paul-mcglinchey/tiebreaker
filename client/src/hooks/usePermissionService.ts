import { useRequestBuilder } from "."
import { IPermission, IPermissionService, Notification } from "../models"
import { endpoints } from "../utilities"
import useAsyncHandler from "./useAsyncHandler"
import useNotification from "./useNotification"

const usePermissionService = (refresh: () => void = () => {}): IPermissionService => {
  const { requestBuilder } = useRequestBuilder()
  const { addNotification } = useNotification()
  const { asyncHandler } = useAsyncHandler()

  const addPermission = asyncHandler(async (values: IPermission) => {
    const res = await fetch(endpoints.permissions, requestBuilder('POST', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully created permission`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`${res.status}: A problem occurred creating permission`, Notification.Error)
  })

  const updatePermission = asyncHandler(async (values: IPermission, permissionId: string | undefined) => {
    if (!permissionId) return addNotification(`Something went wrong...`, Notification.Error);
    
    const res = await fetch(endpoints.permission(permissionId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully updated permission`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`A problem occurred updating the permission`, Notification.Error)
  })

  const deletePermission = asyncHandler(async (permissionId: string | undefined) => {
    if (!permissionId) return addNotification(`Something went wrong...`, Notification.Error);

    const res = await fetch(endpoints.permission(permissionId), requestBuilder("DELETE"))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully deleted permission`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`A problem occurred deleting the permission`, Notification.Error)
  })

  return { addPermission, updatePermission, deletePermission }
}

export default usePermissionService