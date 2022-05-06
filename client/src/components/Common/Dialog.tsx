import { Fragment } from "react"
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { DialogButton } from "."

interface IDialogProps {
  isOpen: boolean
  close: () => void
  positiveActions: (() => void)[]
  title: string
  description: string
  content: string
}

const Dialog = ({ isOpen, close, positiveActions, title, description, content }: IDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessDialog.Panel className="w-full max-w-prose transform overflow-hidden rounded-2xl bg-gray-800 p-6 mt-16 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-200"
                >
                  {title}
                </HeadlessDialog.Title>
                <HeadlessDialog.Description className="sr-only">
                  {description}
                </HeadlessDialog.Description>

                <div className="mt-2">
                  <p className="text-base text-gray-400 prose">
                    {content}
                  </p>
                </div>

                <div className="mt-8 flex justify-between">
                  <DialogButton action={close}>
                    Cancel
                  </DialogButton>
                  <DialogButton action={() => positiveActions.forEach(pa => pa())}>
                    Got it, thanks!
                  </DialogButton>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export default Dialog