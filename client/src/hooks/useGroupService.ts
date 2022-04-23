import { IGroup, IGroupService, Status } from "../models";
import { removeItemInStorage } from "../services"
import { endpoints } from "../utilities";
import { useRequestBuilder, useStatus } from '.';

const useGroupService = (refresh: () => void = () => {}): IGroupService => {
  const { appendStatus, updateIsLoading } = useStatus()
  const { requestBuilder } = useRequestBuilder()

  const addGroup = (values: IGroup) => {
    updateIsLoading(true);

    fetch(endpoints.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully created ${values.name}`, Status.Success);
        } else if (res.status === 400) {
          appendStatus(false, 'Group already exists', Status.Error);
        } else {
          appendStatus(false, `A problem occurred creating ${values.name}`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, `A problem occurred creating the group`, Status.Error);
      })
      .finally(() => {
        updateIsLoading(false)
        removeItemInStorage(endpoints.groups)
        refresh();
      })
  }

  const updateGroup = (values: IGroup, groupId: string | undefined) => {
    updateIsLoading(true);

    if (!groupId) return appendStatus(false, `Group ID must be set before updating`, Status.Error);

    fetch(endpoints.group(groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) appendStatus(false, `Successfully updated group`, Status.Success);
        if (res.status === 400) appendStatus(false, `Bad request`, Status.Error);
        if (!res.ok && res.status !== 400) appendStatus(false, `A problem occurred updating the group`, Status.Error);
      })
      .catch(() => {
        appendStatus(false, `A problem occurred updating the group`, Status.Error);
      })
      .finally(() => {
        updateIsLoading(false)
        refresh();
      })
  }

  const deleteGroup = async (groupId: string | undefined) => {
    if (!groupId) return appendStatus(false, `Group ID must be set before deleting`, Status.Error);
    
    updateIsLoading(true);

    fetch(endpoints.group(groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully deleted group`, Status.Success);
        } else {
          appendStatus(false, `A problem ocurred deleting group`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, '', Status.None);
      })
      .finally(() => {
        updateIsLoading(false)
        removeItemInStorage(endpoints.groups)
        refresh();
      })
  }

  return { addGroup, updateGroup, deleteGroup }
}

export default useGroupService