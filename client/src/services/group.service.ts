import { IAddGroup, IGroup, Status } from "../models";
import { IGroupsEndpoint } from "../models/groups-endpoint.model";
import { IGroupService, IStatusService, IUserService } from "./interfaces";
import { requestBuilder } from "./request.service";
import { UserService } from "./user.service";

export abstract class GroupService<TGroup extends IGroup> implements IGroupService<TGroup> {
  endpoint: IGroupsEndpoint;
  defaultGroupKey: string;
  statusService: IStatusService;
  userService: IUserService;

  constructor(endpoint: IGroupsEndpoint, defaultGroupKey: string, statusService: IStatusService) {
    this.endpoint = endpoint;
    this.defaultGroupKey = defaultGroupKey;
    this.statusService = statusService;
    this.userService = new UserService(statusService);
  }

  addGroup = (values: IAddGroup) => {
    this.statusService.setLoading(true);

    fetch(this.endpoint.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully created ${values.groupName}`, Status.Success);
        } else if (res.status === 400) {
          this.statusService.appendStatus(false, 'Group already exists', Status.Error);
        } else {
          this.statusService.appendStatus(false, `A problem occurred creating ${values.groupName}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred creating the group`, Status.Error);
      })
  }

  isDefaultGroup = (_id: string): boolean => {
    return this.userService.getDefaultGroup(this.defaultGroupKey) === _id;
  }

  deleteGroup = (g: TGroup) => {
    this.statusService.setLoading(true);
    
    if (this.isDefaultGroup(g._id)) {
      this.statusService.appendStatus(false, 'Cannot delete the default group', Status.Error);

      return;
    }

    fetch(this.endpoint.groups, requestBuilder("DELETE", undefined, { _id: g._id, groupName: g.groupName }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted ${g.groupName}`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred deleting ${g.groupName}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, '', Status.None);
      })
  }

  setDefaultGroup = (g: TGroup) => {
    this.statusService.setLoading(true);

    fetch(this.endpoint.default, requestBuilder("PUT", undefined, { _id: g._id, groupName: g.groupName }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, 'Successfully set default group', Status.Success);
        } else {
          this.statusService.appendStatus(false, 'A problem occurred setting the default group', Status.Error);
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        this.statusService.setLoading(false);
      })
  }

} 