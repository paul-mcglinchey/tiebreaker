import { Form, Formik } from "formik"
import { useApplicationService } from "../../hooks"
import { IApplication, IContextualFormProps } from "../../models"
import { applicationValidationSchema } from "../../schema"
import { generateColour } from "../../services"
import { ColourPicker, FormSection, StyledField } from "../Common"

interface IApplicationFormProps {
  application?: IApplication | undefined
}

export const ApplicationForm = ({ application, ContextualSubmissionButton }: IApplicationFormProps & IContextualFormProps) => {

  const { updateApplication, addApplication } = useApplicationService()

  return (
    <Formik
      initialValues={{
        identifier: application?.identifier || NaN,
        name: application?.name || '',
        description: application?.description || '',
        icon: application?.icon || '',
        backgroundImage: application?.backgroundImage || '',
        backgroundVideo: application?.backgroundVideo || '',
        url: application?.url || '',
        colour: application?.colour || generateColour()
      }}
      onSubmit={(values) => {
        application
          ? updateApplication(values, application._id)
          : addApplication(values)
      }}
      validationSchema={applicationValidationSchema}
    >
      {({ errors, touched, isValid, values, setFieldValue }) => (
        <Form className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <StyledField name='identifier' label="Identifier" type="number" classes="col-span-1" errors={errors.identifier} touched={touched.identifier} />
            <StyledField name='name' label="Name" classes="col-span-1" errors={errors.name} touched={touched.name} />
            <StyledField name='url' label="URL/Route" errors={errors.url} classes="col-span-1" touched={touched.url} />
            <StyledField name='description' label="Description" classes="col-span-3" errors={errors.description} touched={touched.description} />
            <FormSection title="Appearance" classes="col-span-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex grow col-span-3 space-x-2 items-end">
                  <StyledField name='icon' label="Icon URL" errors={errors.icon} touched={touched.icon} />
                  <ColourPicker square colour={values.colour} setColour={(colour) => setFieldValue('colour', colour)} />
                </div>
                <StyledField name='backgroundImage' label="Background Image URL" errors={errors.backgroundImage} classes="col-span-3" touched={touched.backgroundImage} />
                <StyledField name='backgroundVideo' label="Background Video URL" errors={errors.backgroundVideo} classes="col-span-3" touched={touched.backgroundVideo} />
              </div>
            </FormSection>
          </div>
          {ContextualSubmissionButton(application ? 'Update application' : 'Add application', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default ApplicationForm