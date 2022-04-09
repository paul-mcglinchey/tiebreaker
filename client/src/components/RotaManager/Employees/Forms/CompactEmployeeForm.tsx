import { PlusIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import { IEmployeeService } from "../../../../services";
import { employeeValidationSchema } from "../../../../utilities";
import { Button, StyledField } from "../../../Common";

interface ICompactEmployeeForm {
  employeeService: IEmployeeService
  groupId: string
  onSubmit?: () => void
}

const CompactEmployeeForm = ({ onSubmit }: ICompactEmployeeForm) => {
  return (
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
        console.log(values);
      }}
    >
      {({ errors, touched, ...props }) => (
        <Form onSubmit={onSubmit || props.handleSubmit} className="flex flex-1 flex-col space-y-8 text-gray-200">
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
  )
}

export default CompactEmployeeForm;