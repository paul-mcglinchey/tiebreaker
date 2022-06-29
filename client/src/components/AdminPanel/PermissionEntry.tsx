import { TrashIcon } from "@heroicons/react/solid"
import { Field, Formik } from "formik"
import { usePermissionService } from "../../hooks"
import { ButtonType, IChildrenProps, IPermission, PermissionType } from "../../models"
import { combineClassNames } from "../../services"
import { permissionValidationSchema } from "../../schema"
import { Button, ListboxSelector } from "../Common"

interface IPermissionEntryProps {
  permission?: IPermission
  fieldClasses?: string
}

interface IPermissionFieldProps {
  name: string
  placeholder?: string
  label?: string
  classes?: string
  fieldClasses?: string
  disabled?: boolean
  errors?: string | undefined
  touched?: boolean | undefined
}

const PermissionField = ({ name, placeholder, label, classes, fieldClasses, disabled, errors, touched }: IPermissionFieldProps) => {
  return (
    <div className={combineClassNames("flex grow flex-col space-y-1", classes)}>
      <Field
        name={name}
        placeholder={placeholder || label || name}
        className={combineClassNames(
          "flex flex-1 bg-gray-800 px-3 py-2 rounded placeholder-gray-500 placeholder-opacity-50",
          disabled && "opacity-50",
          touched && errors && !disabled && "border border-red-500",
          fieldClasses && fieldClasses
        )}
        disabled={disabled}
      />
    </div>
  )
}

export const PermissionHeader = ({ children }: IChildrenProps) => {
  return (
    <div className="uppercase text-sm font-bold tracking-wide px-2">
      {children}
    </div>
  )
}

export const PermissionEntry = ({ permission, fieldClasses }: IPermissionEntryProps) => {

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
        <>
          <div>
            <PermissionField name='identifier' fieldClasses= errors={errors.identifier} touched={touched.identifier} />
          </div>
          <div>
            <PermissionField name='name' errors={errors.name} touched={touched.name} />
          </div>
          <div>
            <PermissionField name='description' errors={errors.name} touched={touched.name} />
          </div>
          <div>
            <PermissionField name='language' disabled errors={errors.name} touched={touched.name} />
          </div>
          <div>
            <ListboxSelector
              label="Permission type"
              items={[{ label: 'Group', value: PermissionType.Group }, { label: 'Application', value: PermissionType.Application }]}
              selected={{ label: values.type?.toString(), value: values.type }}
              setSelected={(value) => setFieldValue('type', value)}
              selectorClasses="bg-gray-800"
              optionsClasses="w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button buttonType={ButtonType.Tertiary} content='Update' />
            <Button buttonType={ButtonType.Cancel} Icon={TrashIcon} type="button" action={() => deletePermission(permission?._id)} />
          </div>
        </>
      )}
    </Formik>
  )
}