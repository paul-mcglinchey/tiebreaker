import { useContext } from "react"
import { EmployeeService, StatusService } from "../../../services"
import { StatusContext } from "../../../utilities"
import { Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void
}

const AddEmployeeModal = ({ modalOpen, toggleModalOpen }: IAddEmployeeModalProps) => {

  const { status, setStatus } = useContext(StatusContext);
  const employeeService = new EmployeeService(new StatusService(status, setStatus));

  return (
    <Modal title="Add employee" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <CompactEmployeeForm employeeService={employeeService} />
    </Modal>
  )
}

export default AddEmployeeModal;