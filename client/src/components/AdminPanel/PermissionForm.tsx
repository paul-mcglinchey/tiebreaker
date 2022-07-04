import { Form, Formik } from "formik"
import { PermissionType } from "../../enums"
import { usePermissionService } from "../../hooks"
import { IContextualFormProps, IPermission } from "../../models"
import { permissionValidationSchema } from "../../schema"
import { ListboxSelector, StyledField } from "../Common"

interface IPermissionFormProps {
  permission?: IPermission | undefined
}

interface IPermissionType {
  label: string | undefined
  value: number
}

const PermissionForm = ({ permission, ContextualSubmissionButton }: IPermissionFormProps & IContextualFormProps) => {

  const { updatePermission, addPermission } = usePermissionService()

  return (
    <Formik
      initialValues={{
        identifier: permission?.identifier || NaN,
        name: permission?.name || '',
        description: permission?.description || '', 
        language: permission?.language || 'en-US', 
        type: permission?.type || Number(PermissionType.Group)
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
            <ListboxSelector<IPermissionType>
              label="Permission type"
              showLabel
              items={[{ label: 'Group', value: PermissionType.Group }, { label: 'Application', value: PermissionType.Application }]}
              initialSelected={{ label: PermissionType[values.type], value: values.type }}
              labelFieldName="label"
              classes="col-span-2"
              onUpdate={(permission) => setFieldValue('type', permission.value)}
            />
          </div>
          {ContextualSubmissionButton(permission ? 'Update permission' : 'Add permission', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default PermissionForm