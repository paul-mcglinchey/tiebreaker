import { GroupService } from "./group.service";
import { IClientGroup } from '../models';
import { endpoints } from "../utilities";
import { IStatusService } from "./interfaces";

export class ClientGroupService extends GroupService<IClientGroup> {
  constructor(statusService: IStatusService) {
    super(endpoints.groups("client"), "defaultClientGroup", statusService);
  }
}