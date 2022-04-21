import { GroupType, IGroup, IUseGroupService, Status } from "../models";
import { removeItemInStorage } from "../services"
import { endpoints } from "../utilities";
import { useRequestBuilder, useStatus } from '.';

const useGroupService = (groupType: GroupType, refresh: () => void = () => {}): IUseGroupService => {

  const groupEndpoints = endpoints.groups(groupType);

  const { appendStatus, updateIsLoading } = useStatus()
  const { requestBuilder } = useRequestBuilder()

  const addGroup = (values: IGroup) => {
    updateIsLoading(true);

    fetch(groupEndpoints.groups, requestBuilder('POST', undefined, values))
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
        removeItemInStorage(groupEndpoints.groups)
        refresh();
      })
  }

  const updateGroup = (values: IGroup, groupId: string | undefined) => {
    updateIsLoading(true);

    if (!groupId) return appendStatus(false, `Group ID must be set before updating`, Status.Error);

    fetch(groupEndpoints.group(groupId), requestBuilder('PUT', undefined, values))
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

    fetch(groupEndpoints.group(groupId), requestBuilder("DELETE"))
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
        removeItemInStorage(groupEndpoints.groups)
        refresh();
      })
  }

  const getTotalUsers = (accessControl?: { [key: string]: string[] } | undefined): number => {
    const distinctUsers: string[] = [];

    if (!accessControl) return 0;

    Object.keys(accessControl).forEach((key: string) => {
      accessControl[key] 
        && Array.isArray(accessControl[key]) 
        && accessControl[key]?.forEach((userId: string) => !distinctUsers.includes(userId) && distinctUsers.push(userId));
    });

    return distinctUsers.length;
  }

  const groupService = { addGroup, updateGroup, deleteGroup, getTotalUsers }

  return { groupService, addGroup, updateGroup, deleteGroup, getTotalUsers }
}

export default useGroupService