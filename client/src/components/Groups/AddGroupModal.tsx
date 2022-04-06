import { IGroup } from "../../models";
import { IGroupService } from "../../services";
import { Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IAddGroupModalProps<TGroup> {
  addGroupOpen: boolean,
  toggleAddGroupOpen: () => void,
  groupService: IGroupService<TGroup>
}

const AddGroupModal = <TGroup extends IGroup>({ addGroupOpen, toggleAddGroupOpen, groupService }: IAddGroupModalProps<TGroup>) => {
  return (
    <Modal title="Add group" modalOpen={addGroupOpen} toggleModalOpen={toggleAddGroupOpen}>
      <GroupForm handleSubmit={(values) => groupService.addGroup(values)} />
    </Modal>
  )
}

export default AddGroupModal;