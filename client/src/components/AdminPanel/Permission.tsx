import { PlusIcon, TrashIcon } from "@heroicons/react/solid"
import { Field, Formik } from "formik"
import { usePermissionService } from "../../hooks"
import { ButtonType, IPermission, PermissionType } from "../../models"
import { combineClassNames } from "../../services"
import { permissionValidationSchema } from "../../schema"
import { Button, ListboxSelector, TableRow, TableRowItem } from "../Common"

interface IPermissionTableRowProps {
  permission?: IPermission
}

interface IPermissionFieldProps {
  name: string
  placeholder?: string
  label?: string
  classes?: string
  disabled?: boolean
  errors?: string | undefined
  touched?: boolean | undefined
}

const PermissionField = ({ name, placeholder, label, classes, disabled, errors, touched }: IPermissionFieldProps) => {
  return (
    <div className={combineClassNames("flex grow flex-col space-y-1", classes)}>
      <Field
        name={name}
        placeholder={placeholder || label || name}
        className={combineClassNames(
          "flex flex-1 bg-gray-800 px-3 py-2 rounded placeholder-gray-500 placeholder-opacity-50",
          disabled && "opacity-50",
          touched && errors && !disabled && "border border-red-500"
        )}
        disabled={disabled}
      />
    </div>
  )
}

const PermissionTableRow = ({ permission }: IPermissionTableRowProps) => {

  const { updatePermission, addPermission, deletePermission } = usePermissionService()

  return (
    <Formik
      initialValues={permission || { identifier: '', name: '', description: '', language: 'en-US', type: PermissionType.Application }}
      onSubmit={(values) => {
        permission
          ? updatePermission(values, permission._id)
          : addPermission(values)
      }}
      validationSchema={permissionValidationSchema}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <TableRow>
          <TableRowItem>
            <PermissionField name='identifier' classes="basis-1/5" errors={errors.identifier} touched={touched.identifier} />
          </TableRowItem>
          <TableRowItem>
            <PermissionField name='name' classes="basis-1/5" errors={errors.name} touched={touched.name} />
          </TableRowItem>
          <TableRowItem>
            <PermissionField name='description' classes="flex-grow" errors={errors.name} touched={touched.name} />
          </TableRowItem>
          <TableRowItem>
            <PermissionField name='language' disabled errors={errors.name} touched={touched.name} />
          </TableRowItem>
          <TableRowItem>
            <div className="flex flex-grow">
              <ListboxSelector
                label="Permission type"
                items={[{ label: 'Group', value: PermissionType.Group }, { label: 'Application', value: PermissionType.Application }]}
                selected={{ label: values.type?.toString(), value: values.type }}
                setSelected={(value) => setFieldValue('type', value)}
                selectorClasses="bg-gray-800"
              />
            </div>
          </TableRowItem>
          <TableRowItem>
            <div className="flex self-end justify-end">
              <div className="flex pb-1">
                {permission ? (
                  <>
                    <Button buttonType={ButtonType.Tertiary} content='Update' />
                    <Button buttonType={ButtonType.Cancel} Icon={TrashIcon} type="button" action={() => deletePermission(permission._id)} />
                  </>
                ) : (
                  <>
                    <Button buttonType={ButtonType.Tertiary} content='Add permission' Icon={PlusIcon} />
                  </>
                )}
              </div>
            </div>
          </TableRowItem>
        </TableRow>
      )}
    </Formik>
  )
}

export default PermissionTableRow