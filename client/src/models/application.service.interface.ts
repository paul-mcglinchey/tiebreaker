import { IApplication, IApplicationContext } from ".";

export interface IApplicationService extends IApplicationContext {
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