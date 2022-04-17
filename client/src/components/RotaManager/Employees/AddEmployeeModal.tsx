import { PlusIcon } from "@heroicons/react/solid"
import { useContext } from "react"
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

  return (
    <Modal title="Add employee" modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen}>
      <CompactEmployeeForm 
        handleSubmit={(values) => {
          employeeService.addEmployee(values, groupId);
          toggleAddEmployeeOpen();
        }} 
        submissionBar={(
          <div className="justify-between flex">
            
            <Button content="Add employee" Icon={PlusIcon} />
          </div>
        )}
      />
    </Modal>
  )
}

export default AddEmployeeModal;