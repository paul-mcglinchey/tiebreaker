import { Notification } from "..";
import { INotificationContainerProps, IStatus } from "../../../models";

const NotificationContainer = ({ statusService }: INotificationContainerProps) => {
  return (
    <div className="absolute z-50 p-2 sm:p-6 w-screen sm:w-auto top-0 right-0 space-y-4 overflow-hidden">
      {statusService.getStatusFeed().map((statusItem: IStatus, key: number) => (
        <Notification key={key} status={statusItem} statusService={statusService} />
      ))}
    </div>
  )
}

export default NotificationContainer;