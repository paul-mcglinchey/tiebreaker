import { IGroupService } from "../../models";
import { Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IAddGroupModalProps {
  addGroupOpen: boolean,
  toggleAddGroupOpen: () => void,
  groupService: IGroupService
}

const AddGroupModal = ({ addGroupOpen, toggleAddGroupOpen, groupService }: IAddGroupModalProps) => {
  return (
    <Modal title="Add group" modalOpen={addGroupOpen} toggleModalOpen={toggleAddGroupOpen}>
      <GroupForm 
        handleSubmit={(values) => {
          groupService.addGroup(values);
          toggleAddGroupOpen();
        }} 
      />
    </Modal>
  )
}

export default AddGroupModal;