import { IEmployee, IRota, IRotaGroup, ISchedule, Status } from "../models";
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

    let first = today.getDate() - today.getDay();
    let last = first + 6;

    var firstDay = new Date(today.setDate(first));
    var lastDay = new Date(today.setDate(last));

    return { firstDay, lastDay };
  }

  addSchedule = (r: IRota, startDate: Date) => {
    var scheduleToAdd: ISchedule = {
      startDate: startDate.toISOString().split("T")[0] || "",
      employees: r.employees?.map((e: IEmployee) => {
        return { employee: e, shifts: [] }
      }) || []
    };

    this.statusService.setLoading(true);

    fetch(endpoints.schedules(r._id || "", undefined), requestBuilder("POST", undefined, scheduleToAdd))
      .then(res => {
        if (res.ok) return this.statusService.appendStatus(false, 'Created new blank schedule', Status.Success);
        if (res.status === 400) return this.statusService.appendStatus(false, 'Bad request...', Status.Error);
      })
      .catch(err => {
        console.error(err);
        this.statusService.appendStatus(false, 'There was a problem creating a new schedule', Status.Error);
      })
  }
}