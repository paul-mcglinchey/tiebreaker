import { PlusIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import { IEmployee } from "../../../../models";
import { employeeValidationSchema } from "../../../../utilities";
import { Button, StyledField } from "../../../Common";

interface ICompactEmployeeFormProps {
  handleSubmit: (values: IEmployee) => void
  submissionBar: JSX.Element | undefined
}

const CompactEmployeeForm = ({ handleSubmit, submissionBar }: ICompactEmployeeFormProps) => {

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
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
          <div className="flex space-x-4 items-center">
            <StyledField compact name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
            <StyledField compact name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
            <StyledField compact name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
          </div>
          {submissionBar ? submissionBar : (
            <div className="self-end">
              <Button content="Add employee" Icon={PlusIcon} />
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default CompactEmployeeForm;