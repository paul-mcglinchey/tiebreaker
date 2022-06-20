import { IApplication, IApplicationsContext } from ".";

export interface IApplicationsService extends IApplicationsContext {
  addApplication     : (
    values: IApplication
  ) => void
  updateApplication  : (
    values: IApplication, 
    applicationId: string | undefined
  ) => void
  deleteApplication  : (
    applicationId: string | undefined
  ) => void
}