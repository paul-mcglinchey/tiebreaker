import { Form, Formik } from "formik"
import { useApplicationService, usePermissionService } from "../../hooks"
import { IContextualFormProps, IPermission, PermissionType } from "../../models"
import { permissionValidationSchema } from "../../schema"
import { ListboxSelector, StyledField } from "../Common"

interface IPermissionFormProps {
  permission?: IPermission | undefined
}

const PermissionForm = ({ permission, ContextualSubmissionButton }: IPermissionFormProps & IContextualFormProps) => {

  const { updatePermission, addPermission } = usePermissionService()
  const { applications, getApplication } = useApplicationService()

  return (
    <Formik
      initialValues={{
        identifier: permission?.identifier || '',
        name: permission?.name || '', 
        description: permission?.description || '', 
        language: permission?.language || 'en-US', 
        type: permission?.type || PermissionType.Application,
        application: permission?.application || ''
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
            <ListboxSelector
              label="Permission type"
              showLabel
              items={[{ label: 'Group', value: PermissionType.Group }, { label: 'Application', value: PermissionType.Application }]}
              selected={{ label: values.type?.toString(), value: values.type }}
              setSelected={(value) => setFieldValue('type', value)}
              classes="col-span-2"
              selectorClasses="bg-gray-900"
              optionsClasses="w-full"
            />
            {values.type === PermissionType.Application && (
              <ListboxSelector 
                label="Application"
                showLabel
                items={applications.map(a => ({ label: a.name, value: a.identifier }))}
                selected={{ label: getApplication(values.application)?.name, value: values.application }}
                setSelected={(value) => setFieldValue('application', value)}
                classes="col-span-2"
                selectorClasses="bg-gray-900"
                optionsClasses="w-full"
              />
            )}
          </div>
          {ContextualSubmissionButton(permission ? 'Update permission' : 'Add permission', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default PermissionForm