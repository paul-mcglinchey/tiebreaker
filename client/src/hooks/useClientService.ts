import { IClient, ISession } from "../models"
import { ClientContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService, useGroupService } from '.'
import { useContext } from "react"
import { IClientService } from "./interfaces"

const useClientService = (): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const { currentGroup } = useGroupService()

  const groupId: string | undefined = currentGroup?.id

  const clientContext = useContext(ClientContext)
  const { clients, setClients } = clientContext

  const getClient = (clientId: string | undefined): IClient | undefined => {
    return clients.find(c => c._id === clientId)
  }

  const addClient = asyncHandler(async (values: IClient) => {
    if (!groupId) throw new Error()

    const res = await fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'client', [() => addClientInContext(json)])
  })

  const updateClient = asyncHandler(async (clientId: string | undefined, values: IClient) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch(endpoints.client(clientId, groupId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'client', [() => updateClientInContext(clientId, json)])
  })

  const deleteClient = asyncHandler(async (clientId: string | undefined) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch(endpoints.client(clientId, groupId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'client', [() => deleteClientInContext(clientId)])
  })

  const addSession = asyncHandler(async (clientId: string | undefined, values: ISession) => {
    if (!clientId || !groupId) throw new Error()

    const res = await fetch((endpoints.sessions(clientId, groupId)), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'session', [])
  })

  const addClientInContext = (client: IClient) => {
    setClients(clients => [...clients, client])
  }

  const deleteClientInContext = (clientId: string) => {
    setClients(clients => clients.filter(c => c._id !== clientId))
  }

  const updateClientInContext = (clientId: string, values: IClient) => {
    setClients(clients => {
      return clients.map(c => {
        return c._id === clientId ? { ...c, ...values } : c
      })
    })
  }

  return { ...clientContext, getClient, addClient, deleteClient, updateClient, addSession }
}

export default useClientService