import { Transition } from "@headlessui/react";
import { ButtonType, IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { Button } from ".";
import { useEffect, useState } from "react";
import { useIsMounted } from "../../hooks";

interface IModalProps {
  title: string,
  modalOpen: boolean,
  toggleModalOpen: () => void
  widthClass?: string
}

const Modal = ({ children, title, modalOpen, toggleModalOpen, widthClass }: IChildrenProps & IModalProps) => {

  const [show, setShow] = useState(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    let body = document.querySelector("body");

    if (body) {
      body.style.overflow = modalOpen ? "hidden" : "auto"
    }

    setTimeout(() => isMounted() && setShow(true), 300)

    return (() => {
      isMounted() && setShow(false)
    })
  }, [modalOpen, isMounted])

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
        "fixed md:absolute inset-0 z-10 bg-gray-700/50 flex flex-col pb-24",
        "w-screen h-screen",
        (show && modalOpen) ? "overflow-auto" : "overflow-hidden"
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
          "relative bg-gray-900 p-6 grow md:grow-0",
          "flex flex-col rounded-t-xl md:rounded-lg transform mt-24 md:mt-12 md:translate-x-1/4",
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