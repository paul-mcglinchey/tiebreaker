import { PlusIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useEmployeeService, useGroupService } from "../../../hooks"
import { Button, Checkbox, Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  addEmployeeOpen: boolean,
  toggleAddEmployeeOpen: () => void
}

const AddEmployeeModal = ({ addEmployeeOpen, toggleAddEmployeeOpen }: IAddEmployeeModalProps) => {

  const { groupId } = useGroupService()
  const { addEmployee } = useEmployeeService()

  const [addMultiple, setAddMultiple] = useState(false);
  const toggleAddMultiple = () => setAddMultiple(!addMultiple);

  return (
    <Modal title="Add employee" modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen}>
      <CompactEmployeeForm
        handleSubmit={(values) => {
          addEmployee(values, groupId);
          !addMultiple && toggleAddEmployeeOpen();
        }}
        submissionBar={(
          <div className="justify-between flex items-center">
            <Checkbox id="addMultiple" label="Add multiple" checked={addMultiple} onChange={() => toggleAddMultiple()} />
            <Button content="Add employee" Icon={PlusIcon} />
          </div>
        )}
      />
    </Modal>
  )
}

export default AddEmployeeModal;