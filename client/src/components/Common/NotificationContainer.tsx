import { IChildrenProps } from "../../models";

const NotificationContainer = ({ children }: IChildrenProps) => {
  return (
    <div className="absolute z-50 p-2 sm:p-6 w-screen sm:w-auto top-0 right-0 space-y-4 overflow-hidden">
      {children}
    </div>
  )
}

export default NotificationContainer;