import { IStatusService } from "../../../services";
import { IStatus } from "../../status.model";

export interface INotificationProps {
  status: IStatus,
  statusService: IStatusService
}