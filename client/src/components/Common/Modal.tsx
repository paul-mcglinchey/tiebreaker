import { Transition } from "@headlessui/react";
import { ButtonType, IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { Button, CustomCheckbox } from ".";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IModalProps {
  title: string,
  modalOpen: boolean,
  toggleModalOpen: () => void
  widthClass?: string
  keepOpen?: boolean,
  setKeepOpen?: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ children, title, modalOpen, toggleModalOpen, widthClass, keepOpen = false, setKeepOpen }: IChildrenProps & IModalProps) => {

  useEffect(() => {
    let body = document.querySelector("body");
    
    if (body) {
      body.style.overflow = modalOpen
        ? "hidden"
        : "auto"
    }
  })

  return (
    <Transition
      show={keepOpen || modalOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className={combineClassNames(
        "absolute inset-0 z-10 bg-gray-700/50 flex justify-center overflow-y-auto",
        "w-screen h-screen"
      )}
    >
      <div className={combineClassNames(
        "absolute bg-gray-900 px-8 py-5 flex flex-col rounded-lg top-32 transform",
        widthClass || 'w-2/3'
      )}>
        <div className="flex justify-between items-center border-b-2 border-gray-400/20 pb-2 mb-8">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <Button buttonType={ButtonType.Cancel} content='Cancel' action={toggleModalOpen} />
        </div>
        {children}
      </div>
      {setKeepOpen && (
        <div className="w-12 h-6">
          <CustomCheckbox state={keepOpen} setState={setKeepOpen} />
        </div>
      )}
    </Transition>
  )
}

export default Modal;