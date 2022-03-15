import { ISchedule } from "./schedule.model";
import { RotaType } from "./types";

export interface IRota {
  _id: string,
  accessControl: {
    [key: string]: string[],
  },
  startDate: string,
  endDate: string,
  schedule: ISchedule[],
  rotaType: RotaType
  locked: boolean,
  createdBy: string,
  updatedBy: string,
  createdAt: string,
  updatedAt: string
}