import { XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { combineClassNames } from '../../../services';
import { Notification } from '../../../models';
import { INotification } from '../../../models';
import { useDelayedRendering, useIsMounted } from '../../../hooks';

interface INotificationCardProps {
  notification: INotification,
  removeNotification: (notificationId: string) => void
}

const NotificationCard = ({ notification, removeNotification }: INotificationCardProps) => {

  const show = useDelayedRendering(100);
  const [open, setOpen] = useState(true);
  const isMounted = useIsMounted();

  const close = useCallback(() => {
    isMounted() && setOpen(false);
    setTimeout(() => removeNotification(notification._id), 1000);
  }, [isMounted, removeNotification, notification._id])

  useEffect(() => {
    setTimeout(() => close(), 3000)
  }, [close])

  return (
    <Transition
      show={show && open}
      enter="transition ease-in-out duration-300"
      enterFrom="transform translate-x-96"
      enterTo="transform translate-x-0"
      leave="transition ease-in-out duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      className={combineClassNames(
        "relative w-full sm:w-96 p-4 m-4 bg-gray-900 border rounded-md drop-shadow-md flex flex-col",
        notification.type === Notification.Success ? "text-green-500" : notification.type === Notification.Error ? "text-red-500" : "text-gray-200",
        notification.type === Notification.Success ? "border-green-500" : notification.type === Notification.Error ? "border-red-500" : "border-gray-200"
      )}
    >
      <div className="flex justify-between">
        <span className="font-bold">{notification.message}</span>
        <button onClick={() => close()} className="flex items-center">
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </Transition>
  )
}

export default memo(NotificationCard);