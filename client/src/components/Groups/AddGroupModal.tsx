import { useGroupService } from "../../hooks";
import { Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IAddGroupModalProps {
  addGroupOpen: boolean,
  toggleAddGroupOpen: () => void
}

const AddGroupModal = ({ addGroupOpen, toggleAddGroupOpen }: IAddGroupModalProps) => {

  const { addGroup } = useGroupService()

  return (
    <Modal title="Add group" modalOpen={addGroupOpen} toggleModalOpen={toggleAddGroupOpen}>
      <GroupForm 
        handleSubmit={(values) => {
          addGroup(values);
          toggleAddGroupOpen();
        }} 
      />
    </Modal>
  )
}

export default AddGroupModal;