import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { DialogButton } from ".";

interface IModalProps {
  title: string,
  description: string,
  isOpen: boolean,
  close: () => void
  level?: 1 | 2 | 3
}

const Modal = ({ children, title, description, isOpen, close, level = 1 }: IChildrenProps & IModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full md:items-start justify-center p-0 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="transform ease-out duration-200"
              enterFrom="opacity-0 translate-y-1/4"
              enterTo="opacity-100 translate-y-0"
              leave="transform ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1/4"
            >
              <Dialog.Panel className={
                combineClassNames(
                  "w-full max-w-7xl transform overflow-hidden rounded-t-2xl md:rounded-2xl bg-gray-800 p-2 py-6 md:p-6 text-left align-middle shadow-xl transition-all",
                  level === 1 && "mt-16 max-w-7xl", level === 2 && "mt-32 max-w-5xl"
                )}
              >
                <div className="flex justify-between mb-6 items-center">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-semibold leading-6 text-gray-200"
                  >
                    {title}
                  </Dialog.Title>
                  <DialogButton action={close}>
                    Cancel
                  </DialogButton>
                </div>
                <Dialog.Description
                  className="sr-only"
                >
                  {description}
                </Dialog.Description>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal;