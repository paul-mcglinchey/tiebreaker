import { useStatus } from "../../../hooks"
import { EmployeeService } from "../../../services"
import { Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void
}

const AddEmployeeModal = ({ modalOpen, toggleModalOpen }: IAddEmployeeModalProps) => {

  const { statusService } = useStatus();
  const employeeService = new EmployeeService(statusService);

  return (
    <Modal title="Add employee" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <CompactEmployeeForm employeeService={employeeService} />
    </Modal>
  )
}

export default AddEmployeeModal;