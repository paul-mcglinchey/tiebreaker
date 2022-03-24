import { IUserResponse } from "../models";
import { endpoints } from "../utilities";
import { IStatusService } from "./interfaces";
import { IUserService } from "./interfaces/user.service.interface";
import { requestBuilder } from "./request.service";

export class UserService implements IUserService {
  statusService: IStatusService;

  constructor(statusService: IStatusService) {
    this.statusService = statusService;
  }

  getDefaultGroup = (groupType: string): Promise<string> => {
    return fetch(endpoints.currentuser, requestBuilder("GET"))
      .then(res => {
        if (!res.ok) {
          return "";
        }

        return res.json();
      })
      .then((user: IUserResponse) => {
        return user.data[groupType] || "";
      })
      .catch(err => {
        console.error(err);
        return "";
      })
  }
}