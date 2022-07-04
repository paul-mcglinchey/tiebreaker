import { IApplicationContext } from "../../contexts/interfaces";
import { IApplication } from "../../models";

export interface IApplicationService extends IApplicationContext {
  getApplication: (identifier: number | undefined) => IApplication | undefined
  addApplication: (values: IApplication) => void
  updateApplication: (values: IApplication, applicationId: string | undefined) => void
  deleteApplication: (applicationId: string | undefined) => void
}