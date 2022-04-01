import { IRota, IRotaGroup, Status } from "../models";
import { endpoints } from "../utilities";
import { IRotaService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class RotaService implements IRotaService {
  statusService: IStatusService;

  constructor(statusService: IStatusService) {
    this.statusService = statusService
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
}