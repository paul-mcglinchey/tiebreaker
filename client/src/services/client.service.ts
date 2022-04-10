import { IClient, ISession, Status } from "../models";
import { endpoints } from "../utilities";
import { IClientService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class ClientService implements IClientService {
  statusService: IStatusService;
  refresh: () => void;

  constructor(statusService: IStatusService, refresh: () => void = () => {}) {
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addClient = (values: IClient, groupId: string) => {
    this.statusService.updateIsLoading(true);

    fetch(endpoints.clients(groupId), requestBuilder('POST', undefined, { ...values, groupId: groupId }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully added client`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem occurred adding client`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred adding the client`, Status.Error);
      })
      .finally(() => {
        this.statusService.updateIsLoading(false)
        this.refresh();
      })
  }

  updateClient = (values: IClient, _id: string) => {
    this.statusService.updateIsLoading(true);

    if (!_id) return this.statusService.appendStatus(false, `Couldn't find a client with that ID`, Status.Error);

    fetch(endpoints.client(_id), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) this.statusService.appendStatus(false, `Successfully updated client`, Status.Success);
        if (res.status === 400) this.statusService.appendStatus(false, `Bad request`, Status.Error);
        if (!res.ok && res.status !== 400) this.statusService.appendStatus(false, `A problem occurred updating the client`, Status.Error);
      })
      .catch(err => {
        console.error(err);
        this.statusService.appendStatus(false, `A problem occurred updating the client`, Status.Error);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }

  deleteClient = (_id: string, groupId: string) => {
    this.statusService.updateIsLoading(true);

    if (!_id) return this.statusService.appendStatus(false, `Couldn't find a client with that ID`, Status.Error);

    fetch(endpoints.client(_id, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully deleted client`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem occurred deleting client`, Status.Error);
        }
      })
      .catch(err => {
        console.error(err);
        this.statusService.appendStatus(false, 'A problem occurred deleting client', Status.None);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }

  addSession = (clientId: string | undefined, session: ISession) => {
    this.statusService.updateIsLoading(true);

    if (!clientId) return this.statusService.appendStatus(false, `Client ID not set`, Status.Error);

    fetch((endpoints.sessions(clientId)), requestBuilder('PUT', undefined, session))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, `Successfully added session`, Status.Success);
        } else {
          this.statusService.appendStatus(false, `A problem occurred adding the session`, Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, `A problem occurred adding the session`, Status.Error);
      })
      .finally(() => this.statusService.updateIsLoading(false))
  }
} 