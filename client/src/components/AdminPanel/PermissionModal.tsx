import { IPermission } from "../../models"
import { Modal } from "../Common"
import { PermissionForm } from '.'

interface IPermissionModalProps {
  permission?: IPermission
  isOpen: boolean
  close: () => void
}

const PermissionModal = ({ permission, isOpen, close }: IPermissionModalProps) => {
  return (
    <Modal
      title={`${permission ? 'Edit' : 'Add'} Permission`}
      description={`This dialog can be used to ${permission ? 'edit an existing' : 'create a new'} permission`}
      isOpen={isOpen}
      close={() => close()}
      allowAddMultiple={!permission}
    >
      {(ConfirmationButton) => (
        <PermissionForm permission={permission || undefined} ContextualSubmissionButton={ConfirmationButton} />
      )}
    </Modal>
  )
}

export default PermissionModal