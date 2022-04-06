import { GroupService } from "./group.service";
import { GroupType, IClientGroup } from '../models';
import { endpoints } from "../utilities";
import { IStatusService } from "./interfaces";

export class ClientGroupService extends GroupService<IClientGroup> {
  constructor(statusService: IStatusService, refresh: () => void = () => {}) {
    super(endpoints.groups(GroupType.CLIENT), "client", statusService, refresh);
  }
}