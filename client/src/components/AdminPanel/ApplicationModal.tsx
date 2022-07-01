import { IApplication } from "../../models"
import { Modal } from "../Common"
import { ApplicationForm } from '.'

interface IApplicationModalProps {
  application?: IApplication
  isOpen: boolean
  close: () => void
}

const ApplicationModal = ({ application, isOpen, close }: IApplicationModalProps) => {
  return (
    <Modal
      title={`${application ? 'Edit' : 'Add'} Application`}
      description={`This dialog can be used to ${application ? 'edit an existing' : 'create a new'} application`}
      isOpen={isOpen}
      close={() => close()}
      allowAddMultiple={!application}
    >
      {(ConfirmationButton) => (
        <ApplicationForm application={application || undefined} ContextualSubmissionButton={ConfirmationButton} />
      )}
    </Modal>
  )
}

export default ApplicationModal