import { IGroup, Status } from "../models";
import { IGroupsEndpoint } from "../models/groups-endpoint.model";
import { IGroupService, IStatusService, IUserService } from "./interfaces";
import { requestBuilder } from "./request.service";
import { getItemInStorage } from "./session-storage.service";
import { UserService } from "./user.service";

export abstract class GroupService<TGroup extends IGroup> implements IGroupService<TGroup> {
  endpoint: IGroupsEndpoint;
  groupType: string;
  statusService: IStatusService;
  userService: IUserService;
  refresh: () => void;

  constructor(endpoint: IGroupsEndpoint, groupType: string, statusService: IStatusService, refresh: () => void) {
    this.endpoint = endpoint;
    this.groupType = groupType;
    this.statusService = statusService;
    this.userService = new UserService(statusService);
    this.refresh = refresh;
  }

  addGroup = (values: IGroup) => {
    this.statusService.setLoading(true);

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
  }

  updateGroup = (values: IGroup, _id: string) => {
    this.statusService.setLoading(true);

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
  }

  deleteGroup = async (g: TGroup) => {
    this.statusService.setLoading(true);

    fetch(this.endpoint.groups, requestBuilder("DELETE", undefined, { _id: g._id }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted ${g.name}`, Status.Success);

          // Check if the group is in session storage and remove it if so
          getItemInStorage(this.groupType + "Group")._id === g._id && sessionStorage.setItem(this.groupType + "Group", "");
        } else {
          this.statusService.appendStatus(false, `A problem ocurred deleting ${g.name}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, '', Status.None);
      })
  }

  getTotalUsers = (accessControl: { [key: string]: string[] }): number => {
    const distinctUsers: string[] = [];

    Object.keys(accessControl).forEach((key: string) => {
      accessControl[key]?.forEach((userId: string) => !distinctUsers.includes(userId) && distinctUsers.push(userId));
    });

    return distinctUsers.length;
  }
} 