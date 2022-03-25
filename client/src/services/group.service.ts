import { IAddGroup, IGroup, Status } from "../models";
import { IGroupsEndpoint } from "../models/groups-endpoint.model";
import { IGroupService, IStatusService, IUserService } from "./interfaces";
import { requestBuilder } from "./request.service";
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

  addGroup = (values: IAddGroup) => {
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

  deleteGroup = async (g: TGroup) => {
    this.statusService.setLoading(true);

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
  }
} 