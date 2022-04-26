import { IGroup } from "../../models";
import { Button, Modal } from "../Common";
import GroupForm from "./GroupForm";

interface IEditGroupProps {
  editGroupOpen: boolean,
  toggleEditGroupOpen: () => void,
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  g: IGroup
}

const EditGroupModal = ({ editGroupOpen, toggleEditGroupOpen, updateGroup, g }: IEditGroupProps) => {
  return (
    <Modal title="Edit group" modalOpen={editGroupOpen} toggleModalOpen={toggleEditGroupOpen}>
      <GroupForm g={g} handleSubmit={(values, groupId) => updateGroup(values, groupId)} submitButton={<Button content='Update group' />}/>
    </Modal>
  )
}

export default EditGroupModal;