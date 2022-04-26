import { IClient, ISession, Notification, IClientService } from "../models"
import { endpoints } from "../utilities"
import { useRequestBuilder, useNotification, useAsyncHandler } from "."

const useClientService = (refresh: () => void = () => {}): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { addNotification } = useNotification()
  const { asyncHandler } = useAsyncHandler()

  const addClient = asyncHandler(async (values: IClient, groupId: string | undefined) => {
    if (!groupId) return addNotification('Group must be set', Notification.Error)

    const res = await fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully created client`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) {
      return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)
    }

    return addNotification(`A problem occurred creating the client`, Notification.Error)
  })

  const updateClient = asyncHandler(async (values: IClient, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return addNotification(`Group and client must be set`, Notification.Error);

    fetch(endpoints.client(clientId, groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) addNotification(`Successfully updated client`, Notification.Success);
        if (res.status === 400) addNotification(`Bad request`, Notification.Error);
        if (!res.ok && res.status !== 400) addNotification(`A problem occurred updating the client`, Notification.Error);
      })
      .catch(err => {
        console.error(err);
        addNotification(`A problem occurred updating the client`, Notification.Error);
      })
  })

  const deleteClient = (clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return addNotification(`Group and client must be set`, Notification.Error);

    fetch(endpoints.client(clientId, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully deleted client`, Notification.Success);
        } else {
          addNotification(`A problem occurred deleting client`, Notification.Error);
        }
      })
      .catch(err => {
        console.error(err);
        addNotification('A problem occurred deleting client', Notification.None);
      })
  }

  const addSession = (values: ISession, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return addNotification(`Request is missing a group or client ID`, Notification.Error);

    fetch((endpoints.sessions(clientId, groupId)), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully added session`, Notification.Success);
        } else {
          addNotification(`A problem occurred adding the session`, Notification.Error);
        }
      })
      .catch(() => {
        addNotification(`A problem occurred adding the session`, Notification.Error);
      })
  }

  return { addClient, deleteClient, updateClient, addSession }
}

export default useClientService