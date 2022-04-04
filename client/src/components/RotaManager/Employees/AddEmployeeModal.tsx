import { useContext } from "react"
import { EmployeeService, StatusService } from "../../../services"
import { StatusContext } from "../../../utilities"
import { Modal } from "../../Common"
import { CompactEmployeeForm } from "./Forms"

interface IAddEmployeeModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  groupId: string
}

const AddEmployeeModal = ({ modalOpen, toggleModalOpen, groupId }: IAddEmployeeModalProps) => {

  const { status, setStatus } = useContext(StatusContext);
  const employeeService = new EmployeeService(new StatusService(status, setStatus));

  return (
    <Modal title="Add employee" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <CompactEmployeeForm employeeService={employeeService} groupId={groupId} />
    </Modal>
  )
}

export default AddEmployeeModal;