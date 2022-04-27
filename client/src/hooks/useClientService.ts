import { IClient, ISession, IClientService } from "../models"
import { endpoints } from "../utilities"
import { useRequestBuilder, useAsyncHandler } from "."
import useResolutionService from "./useResolutionService"

const useClientService = (refresh: () => void = () => {}): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

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

  return { addClient, deleteClient, updateClient, addSession }
}

export default useClientService