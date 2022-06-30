import { Form, Formik } from "formik"
import { usePermissionService } from "../../hooks"
import { IPermission, PermissionType } from "../../models"
import { permissionValidationSchema } from "../../schema"
import { Button, ListboxSelector, StyledField } from "../Common"

interface IPermissionFormProps {
  permission?: IPermission
}

const PermissionForm = ({ permission }: IPermissionFormProps) => {

  const { updatePermission, addPermission } = usePermissionService()

  return (
    <Formik
      initialValues={{
        identifier: permission?.identifier || '',
        name: permission?.name || '', 
        description: permission?.description || '', 
        language: permission?.language || 'en-US', 
        type: permission?.type || PermissionType.Application 
      }}
      onSubmit={(values) => {
        permission
          ? updatePermission(values, permission._id)
          : addPermission(values)
      }}
      validationSchema={permissionValidationSchema}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <StyledField name='identifier' label="Identifier" type="number" classes="col-span-1" errors={errors.identifier} touched={touched.identifier} />
            <StyledField name='name' label="Name" classes="col-span-2" errors={errors.name} touched={touched.name} />
            <StyledField name='description' label="Description" classes="col-span-3" errors={errors.description} touched={touched.description} />
            <StyledField name='language' label="Language" disabled errors={errors.language} touched={touched.language} />
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
          </div>
          <div className="flex justify-end">
            <Button type="submit" content={permission ? "Update permission" : "Add permission"} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default PermissionForm