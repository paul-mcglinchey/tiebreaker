import { PlusIcon } from "@heroicons/react/solid"
import { useContext, useState } from "react"
import { IEmployeeService } from "../../../services"
import { ApplicationContext } from "../../../utilities"
import { Button, Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  addEmployeeOpen: boolean,
  toggleAddEmployeeOpen: () => void,
  employeeService: IEmployeeService
}

const AddEmployeeModal = ({ addEmployeeOpen, toggleAddEmployeeOpen, employeeService }: IAddEmployeeModalProps) => {

  const { groupId } = useContext(ApplicationContext);

  const [addMultiple, setAddMultiple] = useState(false);
  const toggleAddMultiple = () => setAddMultiple(!addMultiple);

  return (
    <Modal title="Add employee" modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen}>
      <CompactEmployeeForm
        handleSubmit={(values) => {
          employeeService.addEmployee(values, groupId);
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