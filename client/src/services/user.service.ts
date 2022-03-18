import { Status } from "../models";
import { endpoints } from "../utilities";
import { IStatusService } from "./interfaces";
import { IUserService } from "./interfaces/user.service.interface";
import { requestBuilder } from "./request.service";

export class UserService implements IUserService {
  statusService: IStatusService;

  constructor(statusService: IStatusService) {
    this.statusService = statusService;
  }

  getDefaultGroup = (groupKey: string): string => {
    let defaultGroupId: string = "";

    fetch(endpoints.defaultgroup(groupKey), requestBuilder("GET"))
      .then(res => {
        if (!res.ok) {
          return;
        }

        return res.json();
      })
      .then((id: string) => defaultGroupId = id)
      .catch(err => {
        console.error(err);
      })

    return defaultGroupId;
  }
}