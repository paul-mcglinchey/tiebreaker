import { EmployeeForm, CompactEmployeeForm } from "."
import { IEmployee } from "../../models"
import { Modal } from "../Common"

interface IEmployeeModalProps {
  employee?: IEmployee | undefined
  isOpen: boolean,
  close: () => void
  level?: 1 | 2 | 3
  compact?: boolean
}

const EmployeeModal = ({ employee, isOpen, close, level = 1, compact = false }: IEmployeeModalProps) => {
  return (
    <Modal
      title="Add employee"
      description="This dialog can be used to create new employees"
      isOpen={isOpen}
      close={close}
      level={level}
    >
      {(ConfirmationButton) => (
        compact ? <CompactEmployeeForm employee={employee} ContextualSubmissionButton={ConfirmationButton}/> : <EmployeeForm employee={employee} ContextualSubmissionButton={ConfirmationButton} />
      )}
    </Modal>
  )
}

export default EmployeeModal;