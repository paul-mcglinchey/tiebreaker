import { IClient, ISession, IClientService } from "../models"
import { ClientContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '../hooks'
import { useContext } from "react"

const useClientService = (): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const clientContext = useContext(ClientContext)
  const { refresh } = clientContext

  const addClient = asyncHandler(async (values: IClient, groupId: string | undefined) => {
    if (!groupId) throw new Error()

    const res = await fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'client', [() => refresh()])
  })

  const updateClient = asyncHandler(async (values: IClient, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch(endpoints.client(clientId, groupId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'client', [() => refresh()])
  })

  const deleteClient = asyncHandler(async (clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch(endpoints.client(clientId, groupId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'client', [() => refresh()])
  })

  const addSession = asyncHandler(async (values: ISession, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch((endpoints.sessions(clientId, groupId)), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'session')
  })

  return { ...clientContext, addClient, deleteClient, updateClient, addSession }
}

export default useClientService