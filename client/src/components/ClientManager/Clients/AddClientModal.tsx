import { PlusIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useClientService, useGroupService } from "../../../hooks"
import { Button, Checkbox, Modal } from "../../Common"
import { CompactClientForm } from "."

interface IAddClientModalProps {
  addClientOpen: boolean,
  toggleAddClientOpen: () => void
}

const AddClientModal = ({ addClientOpen, toggleAddClientOpen }: IAddClientModalProps) => {

  const { groupId } = useGroupService()
  const { addClient } = useClientService()

  const [addMultiple, setAddMultiple] = useState(false);
  const toggleAddMultiple = () => setAddMultiple(!addMultiple);

  return (
    <Modal title="Add client" modalOpen={addClientOpen} toggleModalOpen={toggleAddClientOpen}>
      <CompactClientForm
        handleSubmit={(values) => {
          addClient(values, groupId);
          !addMultiple && toggleAddClientOpen();
        }}
        submissionBar={(
          <div className="justify-between flex items-center">
            <Checkbox id="addMultiple" label="Add multiple" onChange={() => toggleAddMultiple()} checked={addMultiple} />
            <Button content="Add client" Icon={PlusIcon} />
          </div>
        )}
      />
    </Modal>
  )
}

export default AddClientModal;