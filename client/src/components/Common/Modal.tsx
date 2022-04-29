import { Transition } from "@headlessui/react";
import { ButtonType, IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { Button } from ".";
import { useEffect } from "react";

interface IModalProps {
  title: string,
  modalOpen: boolean,
  toggleModalOpen: () => void
  widthClass?: string
}

const Modal = ({ children, title, modalOpen, toggleModalOpen, widthClass }: IChildrenProps & IModalProps) => {

  useEffect(() => {
    let body = document.querySelector("body");

    setTimeout(() => {
        if (body) {
          body.style.overflow = modalOpen ? "hidden" : "auto"
        }
    }, modalOpen ? 0 : 400)
  }, [modalOpen])

  return (
    <Transition
      show={modalOpen}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className={combineClassNames(
        "fixed bottom-0 left-0 z-10 bg-gray-700/50 flex flex-col justify-center",
        "w-screen h-screen overflow-auto"
      )}
    >
      <Transition.Child
        enter="transition ease-out duration-200"
        enterFrom="transform translate-y-full"
        enterTo="transform translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform translate-y-0"
        leaveTo="transform translate-y-full"
        className={combineClassNames(
          "relative bg-gray-900 p-6 flex-grow",
          "flex flex-col rounded-lg transform mt-24",
          widthClass || 'w-full md:w-2/3'
        )}
      >
        <div className="flex justify-between items-center border-b-2 border-gray-400/20 pb-2 mb-8">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <Button buttonType={ButtonType.Cancel} content='Cancel' action={toggleModalOpen} />
        </div>
        {children}
      </Transition.Child>
    </Transition>
  )
}

export default Modal;