import { Transition } from "@headlessui/react";
import { ButtonType } from "../../../models";
import { Button } from "..";
import { useEffect } from "react";
import { combineClassNames } from "../../../services";

interface IDialogProps {
  dialogOpen: boolean,
  toggleDialogOpen: () => void,
  title: string,
  positiveMessage?: string
  negativeMessage?: string
  action: () => void
}

const Dialog = ({ dialogOpen, toggleDialogOpen, title, positiveMessage, negativeMessage, action }: IDialogProps) => {

  useEffect(() => {
    let body = document.querySelector("body");

    if (body) {
      body.style.overflow = dialogOpen
        ? "hidden"
        : "auto"
    }
  })

  const handlePositiveAction = () => {
    action()
    toggleDialogOpen()
  }

  return (
    <>
      <Transition
        show={dialogOpen}
        enter="duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute w-screen h-screen inset-0 z-10 flex md:block overflow-y-hidden bg-gray-400/30"
      >
        <Transition.Child
          enter="transition ease-out duration-200"
          enterFrom="transform translate-y-full"
          enterTo="transform translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="transform translate-y-0"
          leaveTo="transform translate-y-full"
          className={combineClassNames(
            "md:w-1/3 md:mt-0 md:top-1/4 md:p-4 md:rounded-lg md:grow-0 md:translate-x-full",
            "w-full mt-24 p-6 rounded-t-xl grow",
            "flex flex-col relative bg-gray-900"
          )}
        >
          <div className="grow md:grow-0">
            <p className="text-2xl text-gray-200 font-bold tracking-wide whitespace-pre-line leading-10">{title}</p>
          </div>
          <div className="flex flex-col space-y-8 py-24 md:py-0 md:pt-8">
            <div className="flex justify-center">
              <Button type="button" buttonType={ButtonType.Cancel} action={() => handlePositiveAction()} content={positiveMessage || "Yes, I'm fine with deleting this"} XL/>
            </div>
            <div className="flex justify-center">
              <Button type="button" buttonType={ButtonType.Confirm} action={() => toggleDialogOpen()} content={negativeMessage || "No, I don't want to delete this"} XL />
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </>
  )
}

export default Dialog