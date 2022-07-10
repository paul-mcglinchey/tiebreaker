import { Modal } from ".."
import { CompactClientForm, ClientForm } from "."
import { IClient } from "../../models"

interface IAddClientModalProps {
  isOpen: boolean,
  close: () => void,
  client?: IClient,
  compact?: boolean
}

const AddClientModal = ({ isOpen, close, client, compact = false }: IAddClientModalProps) => {
  return (
    <Modal 
      title="Add client"
      description="This dialog can be used to create new clients" 
      isOpen={isOpen}
      close={close}
      allowAddMultiple={!client}
    >
      {(ConfirmationButton) => (
        compact ? <CompactClientForm ContextualSubmissionButton={ConfirmationButton} client={client} /> : <ClientForm ContextualSubmissionButton={ConfirmationButton} client={client} />
      )}
    </Modal>
  )
}

export default AddClientModal;