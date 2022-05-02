import { IGroup } from "../../models";
import { Button, Modal } from "../Common";
import { GroupForm } from ".";

interface IEditGroupProps {
  isOpen: boolean,
  close: () => void
  group?: IGroup
}

const EditGroupModal = ({ isOpen, close, group }: IEditGroupProps) => {
  return (
    <Modal 
      title="Edit group"
      description="This dialog can be used to edit an existing group" 
      isOpen={isOpen}
      close={close}
    >
      <GroupForm 
        group={group}
        submitButton={
          <Button content='Update group' />
        }
      />
    </Modal>
  )
}

export default EditGroupModal;