import { IGroup, Status } from "../models";
import { IGroupsEndpoint } from "../models/groups-endpoint.model";
import { IGroupService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";
import { removeItemInStorage } from "./session-storage.service";

export abstract class GroupService<TGroup extends IGroup> implements IGroupService<TGroup> {
  endpoint: IGroupsEndpoint;
  groupType: string;
  statusService: IStatusService;
  refresh: () => void;

  constructor(endpoint: IGroupsEndpoint, groupType: string, statusService: IStatusService, refresh: () => void) {
    this.endpoint = endpoint;
    this.groupType = groupType;
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addGroup = (values: IGroup) => {
    this.statusService.updateIsLoading(true);

    fetch(this.endpoint.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully created ${values.name}`, Status.Success);
        } else if (res.status === 400) {
          this.statusService.appendStatus(false, 'Group already exists', Status.Error);
        } else {
          this.statusService.appendStatus(false, `A problem occurred creating ${values.name}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred creating the group`, Status.Error);
      })
      .finally(() => {
        this.statusService.updateIsLoading(false)
        removeItemInStorage(this.endpoint.groups)
        this.refresh();
      })
  }

  updateGroup = (values: IGroup, _id: string | undefined) => {
    this.statusService.updateIsLoading(true);

    if (!_id) return this.statusService.appendStatus(false, `Group ID must be set before updating`, Status.Error);

    values._id = _id;

    fetch(this.endpoint.groups, requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) this.statusService.appendStatus(false, `Successfully updated group`, Status.Success);
        if (res.status === 400) this.statusService.appendStatus(false, `Bad request`, Status.Error);
        if (!res.ok && res.status !== 400) this.statusService.appendStatus(false, `A problem occurred updating the group`, Status.Error);
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred updating the group`, Status.Error);
      })
      .finally(() => {
        this.statusService.updateIsLoading(false)
        removeItemInStorage(this.endpoint.groups)
        this.refresh();
      })
  }

  deleteGroup = async (g: TGroup) => {
    this.statusService.updateIsLoading(true);

    fetch(this.endpoint.groups, requestBuilder("DELETE", undefined, { _id: g._id }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted ${g.name}`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred deleting ${g.name}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, '', Status.None);
      })
      .finally(() => {
        this.statusService.updateIsLoading(false)
        removeItemInStorage(this.endpoint.groups)
        this.refresh();
      })
  }

  getTotalUsers = (accessControl?: { [key: string]: string[] }): number => {
    const distinctUsers: string[] = [];

    if (!accessControl) return 0;

    Object.keys(accessControl).forEach((key: string) => {
      accessControl[key]?.forEach((userId: string) => !distinctUsers.includes(userId) && distinctUsers.push(userId));
    });

    return distinctUsers.length;
  }
} 