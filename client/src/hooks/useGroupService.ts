import { IGroup, IGroupService, Notification } from "../models";
import { removeItemInStorage } from "../services"
import { endpoints } from "../utilities";
import { useRequestBuilder, useNotification } from '.';

const useGroupService = (refresh: () => void = () => {}): IGroupService => {
  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()

  const addGroup = (values: IGroup) => {
    

    fetch(endpoints.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully created ${values.name}`, Notification.Success);
        } else if (res.status === 400) {
          addNotification('Group already exists', Notification.Error);
        } else {
          addNotification(`A problem occurred creating ${values.name}`, Notification.Error);
        }
      })
      .catch(() => {
        addNotification(`A problem occurred creating the group`, Notification.Error);
      })
      .finally(() => {
        
        removeItemInStorage(endpoints.groups)
        refresh();
      })
  }

  const updateGroup = (values: IGroup, groupId: string | undefined) => {
    

    if (!groupId) return addNotification(`Group ID must be set before updating`, Notification.Error);

    fetch(endpoints.group(groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) addNotification(`Successfully updated group`, Notification.Success);
        if (res.status === 400) addNotification(`Bad request`, Notification.Error);
        if (!res.ok && res.status !== 400) addNotification(`A problem occurred updating the group`, Notification.Error);
      })
      .catch(() => {
        addNotification(`A problem occurred updating the group`, Notification.Error);
      })
      .finally(() => {
        
        refresh();
      })
  }

  const deleteGroup = async (groupId: string | undefined) => {
    if (!groupId) return addNotification(`Group ID must be set before deleting`, Notification.Error);
    
    

    fetch(endpoints.group(groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully deleted group`, Notification.Success);
        } else {
          addNotification(`A problem ocurred deleting group`, Notification.Error);
        }
      })
      .catch(() => {
        addNotification('', Notification.None);
      })
      .finally(() => {
        
        removeItemInStorage(endpoints.groups)
        refresh();
      })
  }

  return { addGroup, updateGroup, deleteGroup }
}

export default useGroupService