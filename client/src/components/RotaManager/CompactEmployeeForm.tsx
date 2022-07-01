import { Form, Formik } from "formik"
import { useEmployeeService } from "../../hooks";
import { IContextualFormProps, IEmployee } from "../../models"
import { employeeValidationSchema } from "../../schema"
import { StyledField } from "../Common";

interface ICompactEmployeeFormProps {
  employee?: IEmployee | undefined
}

const CompactEmployeeForm = ({ employee, ContextualSubmissionButton }: ICompactEmployeeFormProps & IContextualFormProps) => {

  const { addEmployee, updateEmployee } = useEmployeeService()

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
        employee ? updateEmployee(employee._id, values) : addEmployee(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex grow md:flex-1 flex-col space-y-8 text-gray-200">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 items-center">
            <StyledField compact name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
            <StyledField compact name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
            <StyledField compact name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
          </div>
          {ContextualSubmissionButton()}
        </Form>
      )}
    </Formik>
  )
}

export default CompactEmployeeForm;