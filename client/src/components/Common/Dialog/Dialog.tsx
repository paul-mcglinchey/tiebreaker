import { Transition } from "@headlessui/react";
import { ButtonType } from "../../../models";
import { combineClassNames } from "../../../services";
import { Button } from "..";
import { useEffect } from "react";

interface IDialogProps {
  dialogOpen: boolean,
  toggleDialogOpen: () => void,
  title: string,
  action: () => void
}

const Dialog = ({ dialogOpen, toggleDialogOpen, title, action }: IDialogProps) => {

  useEffect(() => {
    let body = document.querySelector("body");
    
    if (body) {
      body.style.overflow = dialogOpen
        ? "hidden"
        : "auto"
    }
  })

  return (
    <Transition
      show={dialogOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className="absolute w-screen h-screen inset-0 bg-gray-700/60 z-10"
    >
      <div className={combineClassNames(
        "absolute w-3/4 sm:w-1/2 text-center drop-shadow-md bg-gray-900 p-5 flex flex-col space-y-12 rounded-lg left-1/2 top-32 transform -translate-x-1/2"
      )}>
        <div className="flex justify-center">
          <h3 className="text-base md:text-2xl font-bold tracking-widest text-gray-200">{title}</h3>
        </div>
        <div className="flex justify-between md:justify-center space-x-4 text-sm md:text-xl">
          <Button action={toggleDialogOpen} type="button" content="Cancel" buttonType={ButtonType.Cancel} />
          <Button action={action} type="button" content="Yes!" buttonType={ButtonType.Tertiary} />
        </div>
      </div>
    </Transition>
  )
}

export default Dialog