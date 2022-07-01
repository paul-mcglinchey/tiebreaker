import { IApplication, IApplicationContext } from ".";

export interface IApplicationService extends IApplicationContext {
  getApplication: (identifier: string | undefined) => IApplication | undefined
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