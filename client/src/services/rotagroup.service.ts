import { GroupService } from "./group.service";
import { IRotaGroup } from '../models';
import { endpoints } from "../utilities";
import { IStatusService } from "./interfaces";

export class RotaGroupService extends GroupService<IRotaGroup> {
  constructor(statusService: IStatusService) {
    super(endpoints.groups("rota"), "defaultRotaGroup", statusService);
  }
}