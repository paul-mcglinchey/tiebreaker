import { IApplication } from "../models"
import { IApplicationService } from "./interfaces"
import { endpoints } from "../config"
import { useAsyncHandler, useResolutionService, useRequestBuilder } from '.'
import { useContext } from "react"
import { ApplicationContext } from "../contexts"

const useApplicationService = (): IApplicationService => {
  const applicationsContext = useContext(ApplicationContext)
  const { applications = [], setApplications } = applicationsContext

  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const getApplication = (applicationId: number | undefined): IApplication | undefined => {
    return applications.find(a => a.id === applicationId)
  }

  const addApplication = asyncHandler(async (values: IApplication) => {
    const res = await fetch(endpoints.applications, requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'application', [() => addApplicationInContext(json)])
  })

  const updateApplication = asyncHandler(async (values: IApplication, applicationId: number | undefined) => {
    if (!applicationId) throw new Error('Application ID not set')
    
    const res = await fetch(endpoints.application(applicationId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'application', [() => updateApplicationInContext(applicationId, values)])
  })

  const deleteApplication = asyncHandler(async (applicationId: number | undefined) => {
    if (!applicationId) throw new Error('Application ID not set')

    const res = await fetch(endpoints.application(applicationId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'application', [() => deleteApplicationInContext(applicationId)])
  })

  const addApplicationInContext = (application: IApplication) => {
    setApplications(applications => applications ? [...applications, application] : undefined)
  }

  const updateApplicationInContext = (applicationId: number, values: IApplication) => {
    setApplications(applications => {
      return applications ? applications.map(a => {
        return a.id === applicationId ? { ...a, ...values } : a
      }) : undefined
    })
  }

  const deleteApplicationInContext = (applicationId: number) => {
    setApplications(applications => applications ? applications.filter(a => a.id !== applicationId) : undefined)
  } 

  return { ...applicationsContext, getApplication, addApplication, updateApplication, deleteApplication }
}

export default useApplicationService