import { Form, Formik } from "formik"
import { useApplicationService, usePermissionService } from "../../hooks"
import { IApplication, IContextualFormProps } from "../../models"
import { applicationValidationSchema } from "../../schema"
import { ComboboxMultiSelector, StyledField } from "../Common"

interface IApplicationFormProps {
  application?: IApplication | undefined
}

export const ApplicationForm = ({ application, ContextualSubmissionButton }: IApplicationFormProps & IContextualFormProps) => {

  const { updateApplication, addApplication } = useApplicationService()
  const { permissions, getPermission } = usePermissionService()

  return (
    <Formik
      initialValues={{
        identifier: application?.identifier || '',
        name: application?.name || '',
        description: application?.description || '',
        icon: application?.icon || '',
        url: application?.url || '',
        requiredPermissions: application?.requiredPermissions || []
      }}
      onSubmit={(values) => {
        application
          ? updateApplication(values, application._id)
          : addApplication(values)
      }}
      validationSchema={applicationValidationSchema}
    >
      {({ errors, touched, values, setFieldValue, isValid }) => (
        <Form className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <StyledField name='identifier' label="Identifier" type="number" classes="col-span-1" errors={errors.identifier} touched={touched.identifier} />
            <StyledField name='name' label="Name" classes="col-span-2" errors={errors.name} touched={touched.name} />
            <StyledField name='description' label="Description" classes="col-span-3" errors={errors.description} touched={touched.description} />
            <StyledField name='icon' label="Icon URL" errors={errors.icon} classes="col-span-3" touched={touched.icon} />
            <StyledField name='url' label="URL/Route" errors={errors.url} classes="col-span-3" touched={touched.url} />
          </div>
          <ComboboxMultiSelector 
            label="Required permissions"
            items={permissions.map(p => ({ label: p.name, value: p.identifier }))}
            selected={values.requiredPermissions.map(rp => ({ label: getPermission(rp)?.name, value: rp }))}
            setSelected={values => setFieldValue('requiredPermissions', values.map(v => v.value))}
          />
          {ContextualSubmissionButton(application ? 'Update application' : 'Add application', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default ApplicationForm