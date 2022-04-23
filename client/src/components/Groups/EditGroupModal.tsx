import { IGroup, IGroupService } from "../../models";
import { Button, Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IEditGroupProps {
  editGroupOpen: boolean,
  toggleEditGroupOpen: () => void,
  groupService: IGroupService,
  g: IGroup
}

const EditGroupModal = ({ editGroupOpen, toggleEditGroupOpen, groupService, g }: IEditGroupProps) => {
  return (
    <Modal title="Edit group" modalOpen={editGroupOpen} toggleModalOpen={toggleEditGroupOpen}>
      <GroupForm g={g} handleSubmit={(values, groupId) => groupService.updateGroup(values, groupId)} submitButton={<Button content='Update group' />}/>
    </Modal>
  )
}

export default EditGroupModal;