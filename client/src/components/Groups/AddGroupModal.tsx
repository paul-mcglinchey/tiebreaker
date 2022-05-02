import { Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IAddGroupModalProps {
  isOpen: boolean,
  close: () => void
}

const AddGroupModal = ({ isOpen, close }: IAddGroupModalProps) => {
  return (
    <Modal 
      title="Add group"
      description="This dialog can be used to create a new group"
      isOpen={isOpen} 
      close={close}>
      <GroupForm 
        additionalSubmissionActions={[close]} 
      />
    </Modal>
  )
}

export default AddGroupModal;