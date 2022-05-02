import { PlusIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useEmployeeService, useGroupService } from "../../../hooks"
import { Button, Checkbox, Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  isOpen: boolean,
  close: () => void
  level?: 1 | 2 | 3
}

const AddEmployeeModal = ({ isOpen, close, level = 1 }: IAddEmployeeModalProps) => {

  const { groupId } = useGroupService()
  const { addEmployee } = useEmployeeService()

  const [addMultiple, setAddMultiple] = useState(false);
  const toggleAddMultiple = () => setAddMultiple(!addMultiple);

  return (
    <Modal
      title="Add employee"
      description="This dialog can be used to create new employees"
      isOpen={isOpen}
      close={close}
      level={level}
    >
      <CompactEmployeeForm
        handleSubmit={(values) => {
          addEmployee(values, groupId);
          !addMultiple && close();
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