import { IRota, ISchedule, Status } from "../models";
import { endpoints } from "../utilities";
import { IRotaService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class RotaService implements IRotaService {
  statusService: IStatusService;
  refresh: () => void = () => { };

  constructor(statusService: IStatusService, refresh: () => void = () => { }) {
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addRota = (values: IRota, groupId: string) => {
    this.statusService.updateIsLoading(true);

    if (!groupId) {
      return this.statusService.appendStatus(false, 'Group must be set', Status.Error);
    }

    fetch(endpoints.rotas(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, 'Successfully added rota', Status.Success);
        } else {
          this.statusService.appendStatus(false, 'A problem occurred adding rota', Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, 'A problem ocurred adding rota', Status.Error);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }

  updateRota = (values: IRota, rota: IRota | undefined) => {
    this.statusService.updateIsLoading(true);

    fetch(endpoints.rota(rota?._id || ""), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, 'Successfully updated rota', Status.Success);
        } else {
          this.statusService.appendStatus(false, 'A problem occurred updating rota', Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, 'A problem ocurred updating rota', Status.Error);
      })
      .finally(() => {
        this.statusService.updateIsLoading(false);
        this.refresh();
      })
  }

  deleteRota = (r: IRota, groupId: string | undefined) => {
    this.statusService.updateIsLoading(true);

    if (!groupId || !r._id) return this.statusService.appendStatus(false, `A problem occurred deleting the rota.`, Status.Error);

    fetch(endpoints.rota(r._id, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted rota`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred deleting the rota`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred deleting the rota`, Status.Error);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }

  getWeek = (weekModifier: number): { firstDay: Date, lastDay: Date } => {
    let current = new Date();
    let today = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()))
    today.setDate(today.getDate() + (weekModifier * 7));

    // Using custom index here to ensure that the current week is not calculated off of Sunday being the first day
    let mondayAsFirstDayIndex = [6, 0, 1, 2, 3, 4, 5];

    let first = today.getDate() - (mondayAsFirstDayIndex[today.getDay()] || 0);
    let last = first + 6;

    var firstDay = new Date(new Date(today.setDate(first)).toISOString());
    var lastDay = new Date(new Date(today.setDate(last)).toISOString());

    return { firstDay, lastDay };
  }

  updateSchedule = (r: IRota, s: ISchedule) => {
    this.statusService.updateIsLoading(true);
    
    let startDate = new Date(s.startDate || "").toISOString().split('T')[0];
    if (!r._id || !startDate) return this.statusService.appendStatus(false, 'Something went wrong...', Status.Error);

    fetch(endpoints.schedule(r._id, startDate), requestBuilder("PUT", undefined, s))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully updated schedule`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred updating the schedule`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred updating the schedule`, Status.Error);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }
}