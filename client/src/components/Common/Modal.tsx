import { Transition } from "@headlessui/react";
import { IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";

interface IModalProps {
  modalOpen: boolean,
  widthClass?: string
}

const Modal = ({ children, modalOpen, widthClass = "w-2/3" }: IChildrenProps & IModalProps) => {
  return (
    <Transition
      show={modalOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className="absolute w-screen h-screen inset-0 bg-gray-700/40 z-10"
    >
      <div className={combineClassNames(
          "relative bg-gray-900 px-8 py-5 flex flex-col space-y-4 rounded top-32 left-1/2 transform -translate-x-1/2", widthClass

      )}>
        {children}
      </div>
    </Transition>
  )
}

export default Modal;