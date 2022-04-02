import { IRota, IRotaGroup, ISchedule, Status } from "../models";
import { endpoints } from "../utilities";
import { IRotaService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class RotaService implements IRotaService {
  statusService: IStatusService;
  refresh: () => void = () => {};

  constructor(statusService: IStatusService, refresh: () => void = () => {}) {
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addRota = (values: IRota, rotaGroup: IRotaGroup) => {
    this.statusService.setLoading();

    if (!rotaGroup) {
      return this.statusService.appendStatus(false, 'Group must be set', Status.Error);
    }

    fetch(endpoints.rotas(rotaGroup._id), requestBuilder('POST', undefined, values))
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
  }

  deleteRota = (r: IRota) => {
    this.statusService.setLoading(true);

    fetch(endpoints.rota(r._id), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted ${r.name}`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred deleting ${r.name}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred deleting ${r.name}`, Status.Error);
      })
  }

  getWeek = (weekModifier: number): { firstDay: Date, lastDay: Date } => {
    let current = new Date();
    let today = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()))
    today.setDate(today.getDate() + (weekModifier * 7));

    let first = today.getDate() - today.getDay() + 1;
    let last = first + 6;

    var firstDay = new Date(new Date(today.setDate(first)).toISOString());
    var lastDay = new Date(new Date(today.setDate(last)).toISOString());

    return { firstDay, lastDay };
  }

  updateSchedule = (r: IRota, s: ISchedule) => {
    this.statusService.setLoading(true);

    fetch(endpoints.schedules.put(r._id || "", new Date(s.startDate).toISOString().split('T')[0] || ""), requestBuilder("PUT", undefined, s))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully updated ${r.name}`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem ocurred updating ${r.name}`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred updating ${r.name}`, Status.Error);
      })
  }
}