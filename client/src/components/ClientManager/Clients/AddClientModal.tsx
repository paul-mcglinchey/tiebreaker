import { PlusIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Button, Checkbox, Modal } from "../../Common"
import { CompactClientForm } from "."

interface IAddClientModalProps {
  isOpen: boolean,
  close: () => void
}

const AddClientModal = ({ isOpen, close }: IAddClientModalProps) => {
  const [addMultiple, setAddMultiple] = useState(false);
  const toggleAddMultiple = () => setAddMultiple(!addMultiple);

  return (
    <Modal 
      title="Add client"
      description="This dialog can be used to create new clients" 
      isOpen={isOpen} 
      close={close}
    >
      <CompactClientForm
        submissionBar={(
          <div className="justify-between flex items-center">
            <Checkbox id="addMultiple" label="Add multiple" onChange={() => toggleAddMultiple()} checked={addMultiple} />
            <Button content="Add client" Icon={PlusIcon} />
          </div>
        )}
        additionalSubmissionActions={!addMultiple ? [close] : []}
      />
    </Modal>
  )
}

export default AddClientModal;