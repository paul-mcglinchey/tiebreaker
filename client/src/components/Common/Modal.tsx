import { Transition } from "@headlessui/react";
import { ButtonType, IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import Button from "./Button";

interface IModalProps {
  title: string,
  modalOpen: boolean,
  toggleModalOpen: () => void
  widthClass?: string
}

const Modal = ({ children, title, modalOpen, toggleModalOpen, widthClass = "w-2/3" }: IChildrenProps & IModalProps) => {
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
        "absolute bg-gray-900 px-8 py-5 flex flex-col space-y-4 rounded left-1/2 top-32 transform -translate-x-1/2", widthClass
      )}>
        <div className="flex justify-between items-center border-b-2 border-gray-400/20 pb-2 mb-4">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <Button buttonType={ButtonType.Cancel} content='Cancel' action={toggleModalOpen} />
        </div>
        {children}
      </div>
    </Transition>
  )
}

export default Modal;