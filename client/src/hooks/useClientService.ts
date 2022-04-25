import { IClient, ISession, Notification, IClientService } from "../models"
import { endpoints } from "../utilities"
import useRequestBuilder from "./useRequestBuilder"
import useNotification from "./useNotification"

const useClientService = (refresh: () => void = () => {}): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { addNotification } = useNotification()

  const addClient = (values: IClient, groupId: string | undefined) => {
    if (!groupId) return addNotification('Group must be set', Notification.Error)

    fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully added client`, Notification.Success)
        } else {
          addNotification(`A problem occurred adding client`, Notification.Error)
        }
      })
      .catch(err => {
        console.error(err)
        addNotification(`A problem occurred adding the client`, Notification.Error)
      })
      .finally(() => {
        refresh()
      })
  }

  const updateClient = (values: IClient, clientId: string | undefined, groupId: string | undefined) => {
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
  }

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