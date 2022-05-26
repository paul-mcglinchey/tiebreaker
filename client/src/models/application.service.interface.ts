import { IApplication } from ".";

export interface IApplicationService {
  loading: boolean
  getApplications: (groupId: string) => Promise<IApplication[] | void>
}