import { useStatus } from "../../../hooks";
import { IStatus } from "../../../models";
import Notification from "./Notification";

const NotificationContainer = () => {

  const { status, removeStatus } = useStatus();

  return (
    <div className="absolute z-50 w-screen sm:w-auto top-0 right-0 space-y-4 overflow-hidden">
        {status.map((s: IStatus, index: number) => (
          <Notification status={s} removeStatus={removeStatus} key={index} />
        ))}
    </div>
  )
}

export default NotificationContainer;