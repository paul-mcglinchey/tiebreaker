import { Transition } from "@headlessui/react"
import { Button } from ".";
import { ButtonType } from "../../models";

interface IDeleteModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  deleteFunction: () => void
}

const DeleteModal = ({ modalOpen, deleteFunction, toggleModalOpen }: IDeleteModalProps) => {
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
        <div className="relative bg-gray-900 px-8 py-5 flex flex-col space-y-4 rounded w-1/2 top-32 left-1/2 transform -translate-x-1/2">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold tracking-wider text-gray-200">Are you sure you want to delete this?</h3>
          </div>
          <div className="flex justify-center space-x-4">
            <Button action={toggleModalOpen} type="button" content="No, take me back" buttonType={ButtonType.Cancel} />
            <Button action={deleteFunction} type="button" content="Yes, absolutely!" buttonType={ButtonType.Tertiary} />
          </div>
        </div>
      </Transition>
  )
}

export default DeleteModal;