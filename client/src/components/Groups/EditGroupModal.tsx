import { IGroup } from "../../models";
import { IGroupService } from "../../services";
import { Button, Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IEditGroupProps<TGroup> {
  editGroupOpen: boolean,
  toggleEditGroupOpen: () => void,
  groupService: IGroupService<TGroup>,
  g: IGroup
}

const EditGroupModal = <TGroup extends IGroup>({ editGroupOpen, toggleEditGroupOpen, groupService, g }: IEditGroupProps<TGroup>) => {
  return (
    <Modal title="Edit group" modalOpen={editGroupOpen} toggleModalOpen={toggleEditGroupOpen}>
      <GroupForm g={g} handleSubmit={(values, _id) => groupService.updateGroup(values, _id)} submitButton={<Button content='Update group' />}/>
    </Modal>
  )
}

export default EditGroupModal;