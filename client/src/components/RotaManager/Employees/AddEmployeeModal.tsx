import { PlusIcon } from "@heroicons/react/solid"
import { Form, Formik } from "formik"
import { useContext } from "react"
import { EmployeeService, StatusService } from "../../../services"
import { employeeValidationSchema, StatusContext } from "../../../utilities"
import { Button, Modal, StyledField } from "../../Common"

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
      <Formik
        initialValues={{
          name: {
            firstName: '',
            lastName: '',
          },
          contactInfo: {
            primaryEmail: ''
          }
        }}
        validationSchema={employeeValidationSchema}
        onSubmit={(values) => {
          employeeService.addEmployee(values, groupId);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
            <div className="flex space-x-4 items-center">
              <StyledField compact name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
              <StyledField compact name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
              <StyledField compact name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
            </div>
            <div className="self-end">
              <Button content="Add employee" Icon={PlusIcon} />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddEmployeeModal;