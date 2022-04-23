import { XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { useCallback, useEffect, useState } from 'react';
import { combineClassNames } from '../../../services';
import { Status } from '../../../models/types/status.type';
import { IStatus } from '../../../models';
import { useDelayedRendering, useIsMounted } from '../../../hooks';

interface INotificationProps {
  status: IStatus,
  removeStatus: (statusId: string) => void
}

const Notification = ({ status, removeStatus }: INotificationProps) => {

  const show = useDelayedRendering(100);
  const [open, setOpen] = useState(true);
  const isMounted = useIsMounted();

  const close = useCallback(() => {
    isMounted() && setOpen(false);
    setTimeout(() => removeStatus(status._id), 1000);
  }, [isMounted, removeStatus, status._id])

  useEffect(() => {
    setTimeout(() => close(), 3000)
  }, [close])

  return (
    <Transition
      show={show && open && !status.isLoading}
      enter="transition ease-in-out duration-300"
      enterFrom="transform translate-x-96"
      enterTo="transform translate-x-0"
      leave="transition ease-in-out duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      className={combineClassNames(
        "relative w-full sm:w-96 p-4 m-4 bg-gray-900 border rounded-md drop-shadow-md flex flex-col",
        status.type === Status.Success ? "text-green-500" : status.type === Status.Error ? "text-red-500" : "text-gray-200",
        status.type === Status.Success ? "border-green-500" : status.type === Status.Error ? "border-red-500" : "border-gray-200"
      )}
    >
      <div className="flex justify-between">
        <span className="font-bold">{status.message}</span>
        <button onClick={() => close()} className="flex items-center">
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </Transition>
  )
}

export default Notification;