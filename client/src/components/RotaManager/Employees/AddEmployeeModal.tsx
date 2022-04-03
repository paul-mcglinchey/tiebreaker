import { Transition } from "@headlessui/react"
import { Form, Formik } from "formik"
import { useContext } from "react"
import { ButtonType } from "../../../models"
import { EmployeeService, StatusService } from "../../../services"
import { employeeValidationSchema, StatusContext } from "../../../utilities"
import { Button, StyledField } from "../../Common"

interface IAddEmployeeModalProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  groupId: string
}

const AddEmployeeModal = ({ modalOpen, toggleModalOpen, groupId }: IAddEmployeeModalProps) => {

  const { status, setStatus } = useContext(StatusContext);
  const employeeService = new EmployeeService(new StatusService(status, setStatus));

  return (
    <Transition
      show={modalOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className="absolute w-screen h-screen inset-0 bg-gray-700/40 z-10"
    >
      <div className="relative bg-gray-900 px-8 py-5 flex flex-col space-y-4 rounded w-3/4 top-32 left-1/2 transform -translate-x-1/2">
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
              {console.log(errors)}
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold tracking-wider">Add employee</div>
                <Button action={toggleModalOpen} type="button" content='Cancel' buttonType={ButtonType.Cancel} />
              </div>
              <div className="flex space-x-4 items-center">
                <StyledField compact name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
                <StyledField compact name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
                <StyledField compact name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
                <Button content="Add employee" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Transition >
  )
}

export default AddEmployeeModal;