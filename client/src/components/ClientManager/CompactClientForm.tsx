import { Form, Formik } from "formik";
import { useClientService } from "../../hooks";
import { clientValidationSchema } from "../../schema";
import { StyledField } from "..";
import { IClient, IContextualFormProps } from "../../models";

interface ICompactClientFormProps {
  client?: IClient | undefined
}

const CompactClientForm = ({ client, ContextualSubmissionButton }: ICompactClientFormProps & IContextualFormProps) => {

  const { addClient, updateClient } = useClientService()

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
      onSubmit={(values) => {
        client ? updateClient(client._id, values) : addClient(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
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

export default CompactClientForm;