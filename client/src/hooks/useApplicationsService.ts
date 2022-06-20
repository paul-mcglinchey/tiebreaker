import { useRequestBuilder } from "."
import { IApplication, IApplicationsService, Notification } from "../models"
import { endpoints } from "../config"
import { useAsyncHandler, useNotification } from '.'
import { useContext } from "react"
import { ApplicationsContext } from "../contexts"

const useApplicationsService = (refresh: () => void = () => {}): IApplicationsService => {
  const applicationsContext = useContext(ApplicationsContext)

  const { requestBuilder } = useRequestBuilder()
  const { addNotification } = useNotification()
  const { asyncHandler } = useAsyncHandler()

  const addApplication = asyncHandler(async (values: IApplication) => {
    const res = await fetch(endpoints.applications, requestBuilder('POST', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully created application`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`${res.status}: A problem occurred creating application`, Notification.Error)
  })

  const updateApplication = asyncHandler(async (values: IApplication, applicationId: string | undefined) => {
    if (!applicationId) return addNotification(`Something went wrong...`, Notification.Error);
    
    const res = await fetch(endpoints.application(applicationId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully updated application`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`A problem occurred updating the application`, Notification.Error)
  })

  const deleteApplication = asyncHandler(async (applicationId: string | undefined) => {
    if (!applicationId) return addNotification(`Something went wrong...`, Notification.Error);

    const res = await fetch(endpoints.application(applicationId), requestBuilder("DELETE"))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully deleted application`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`A problem occurred deleting the application`, Notification.Error)
  })

  return { ...applicationsContext, addApplication, updateApplication, deleteApplication }
}

export default useApplicationsService