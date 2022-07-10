import { Form, Formik } from "formik"
import { useApplicationService, usePermissionService } from "../../hooks"
import { IApplication, IContextualFormProps, IPermission } from "../../models"
import { permissionValidationSchema } from "../../schema"
import { ListboxMultiSelector, StyledField } from "../Common"

interface IPermissionFormProps {
  permission?: IPermission | undefined
}

const PermissionForm = ({ permission, ContextualSubmissionButton }: IPermissionFormProps & IContextualFormProps) => {

  const { updatePermission, addPermission } = usePermissionService()
  const { applications = [], getApplication } = useApplicationService()

  return (
    <Formik
      initialValues={{
        identifier: permission?.identifier || NaN,
        name: permission?.name || '',
        description: permission?.description || '',
        language: permission?.language || 'en-US',
        applications: permission?.applications || []
      }}
      onSubmit={(values) => {
        permission
          ? updatePermission(values, permission._id)
          : addPermission(values)
      }}
      validationSchema={permissionValidationSchema}
    >
      {({ errors, touched, values, setFieldValue, isValid }) => (
        <Form className="flex flex-col space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <StyledField name='identifier' label="Identifier" type="number" classes="col-span-1" errors={errors.identifier} touched={touched.identifier} />
            <StyledField name='name' label="Name" classes="col-span-3" errors={errors.name} touched={touched.name} />
            <StyledField name='description' as="textarea" label="Description" classes="col-span-4" errors={errors.description} touched={touched.description} />
            <StyledField name='language' label="Language" classes="col-span-4" disabled errors={errors.language} touched={touched.language} />
            <ListboxMultiSelector<IApplication>
              items={applications}
              labelFieldName="name"
              label="Associated applications"
              showLabel
              classes="col-span-4"
              initialSelected={values.applications.map(a => getApplication(a)).filter((a): a is IApplication => !!a)}
              onUpdate={(applications) => setFieldValue('applications', applications.map(a => a.identifier))}
            />
          </div>
          {ContextualSubmissionButton(permission ? 'Update permission' : 'Add permission', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default PermissionForm