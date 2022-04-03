import { Button } from ".";
import { ButtonType } from "../../models";
import Modal from "./Modal";

interface IDeleteModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  deleteFunction: () => void,
  description?: string
}

const DeleteModal = ({ modalOpen, deleteFunction, toggleModalOpen, description }: IDeleteModalProps) => {
  return (
    <Modal modalOpen={modalOpen}>
      <div className="flex justify-center">
        <h3 className="text-2xl font-bold tracking-wider text-gray-200">Are you sure you want to delete this{description && " " + description}?</h3>
      </div>
      <div className="flex justify-center space-x-4">
        <Button action={toggleModalOpen} type="button" content="No, take me back" buttonType={ButtonType.Cancel} />
        <Button action={deleteFunction} type="button" content="Yes, absolutely!" buttonType={ButtonType.Tertiary} />
      </div>
    </Modal>
  )
}

export default DeleteModal;