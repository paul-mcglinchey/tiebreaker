import { XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { INotificationProps } from '../../../models';
import { combineClassNames } from '../../../services';
import { Status } from '../../../models/types/status.type';

const Notification = ({ status, statusService }: INotificationProps) => {

  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
  }

  useEffect(() => {
    setTimeout(() => close(), 5000);

    return () => statusService.removeStatus(status);
  })

  return (
    <Transition
      show={open && !status.isLoading}
      enter="transition ease-in-out duration-300"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition ease-in-out duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      className={combineClassNames(
        "relative w-full sm:w-96 p-4 bg-gray-900 border rounded-md drop-shadow-md flex flex-col",
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