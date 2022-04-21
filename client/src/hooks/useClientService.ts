import { IClient, ISession, Status, IClientService } from "../models"
import { endpoints } from "../utilities"
import useRequestBuilder from "./useRequestBuilder"
import useStatus from "./useStatus"

const useClientService = (refresh: () => void = () => {}): IClientService => {

  const { requestBuilder } = useRequestBuilder()
  const { appendStatus, updateIsLoading } = useStatus()

  const addClient = (values: IClient, groupId: string | undefined) => {
    
    if (!groupId) return appendStatus(false, 'Request is missing a group ID', Status.Error)
    
    updateIsLoading(true);

    fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, { ...values, groupId: groupId }))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully added client`, Status.Success);
        } else {
          appendStatus(false, `A problem occurred adding client`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, `A problem occurred adding the client`, Status.Error);
      })
      .finally(() => {
        updateIsLoading(false)
        refresh();
      })
  }

  const updateClient = (values: IClient, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return appendStatus(false, `Request is missing a group or client ID`, Status.Error);
    
    updateIsLoading(true);

    fetch(endpoints.client(clientId, groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) appendStatus(false, `Successfully updated client`, Status.Success);
        if (res.status === 400) appendStatus(false, `Bad request`, Status.Error);
        if (!res.ok && res.status !== 400) appendStatus(false, `A problem occurred updating the client`, Status.Error);
      })
      .catch(err => {
        console.error(err);
        appendStatus(false, `A problem occurred updating the client`, Status.Error);
      })
      .finally(() => updateIsLoading(false))
  }

  const deleteClient = (clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return appendStatus(false, `Request is missing a group or client ID`, Status.Error);
    
    updateIsLoading(true);

    fetch(endpoints.client(clientId, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully deleted client`, Status.Success);
        } else {
          appendStatus(false, `A problem occurred deleting client`, Status.Error);
        }
      })
      .catch(err => {
        console.error(err);
        appendStatus(false, 'A problem occurred deleting client', Status.None);
      })
      .finally(() => updateIsLoading(false))
  }

  const addSession = (values: ISession, clientId: string | undefined, groupId: string | undefined) => {
    if (!clientId || !groupId) return appendStatus(false, `Request is missing a group or client ID`, Status.Error);
    
    updateIsLoading(true);

    fetch((endpoints.sessions(clientId, groupId)), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully added session`, Status.Success);
        } else {
          appendStatus(false, `A problem occurred adding the session`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, `A problem occurred adding the session`, Status.Error);
      })
      .finally(() => updateIsLoading(false))
  }

  return { addClient, deleteClient, updateClient, addSession }
}

export default useClientService