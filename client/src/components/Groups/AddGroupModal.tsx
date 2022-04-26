import { IGroup } from "../../models";
import { Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IAddGroupModalProps {
  addGroupOpen: boolean,
  toggleAddGroupOpen: () => void,
  addGroup: (values: IGroup) => void
}

const AddGroupModal = ({ addGroupOpen, toggleAddGroupOpen, addGroup }: IAddGroupModalProps) => {

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