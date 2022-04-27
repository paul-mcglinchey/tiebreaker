import { PlusIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useEmployeeService, useGroupService } from "../../../hooks"
import { Button, Modal } from "../../Common"
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
            <div className="flex space-x-2 items-center">
              <input className="h-5 w-5 rounded-full" type="checkbox" id="addMultiple" checked={addMultiple} onChange={toggleAddMultiple} />
              <label htmlFor="addMultiple" className="font-semibold tracking-wider">Add multiple</label>
            </div>
            <Button content="Add employee" Icon={PlusIcon} />
          </div>
        )}
      />
    </Modal>
  )
}

export default AddEmployeeModal;