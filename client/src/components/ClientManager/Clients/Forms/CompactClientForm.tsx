import { PlusIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import { useClientService, useGroupService } from "../../../../hooks";
import { clientValidationSchema } from "../../../../utilities";
import { Button, StyledField } from "../../../Common";

interface ICompactClientFormProps {
  submissionBar?: JSX.Element | undefined
  additionalSubmissionActions?: (() => void)[]
}

const CompactClientForm = ({ submissionBar, additionalSubmissionActions }: ICompactClientFormProps) => {

  const { addClient } = useClientService()
  const { groupId } = useGroupService()

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
      validationSchema={clientValidationSchema}
      onSubmit={(values, actions) => {
        addClient(values, groupId)

        additionalSubmissionActions?.forEach(asa => asa())
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 items-center">
            <StyledField compact name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
            <StyledField compact name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
            <StyledField compact name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
          </div>
          {submissionBar ? submissionBar : (
            <div className="self-end">
              <Button content="Add Client" Icon={PlusIcon} />
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default CompactClientForm;