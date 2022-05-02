import { PlusIcon, TrashIcon } from "@heroicons/react/solid"
import { Field, Form, Formik } from "formik"
import { usePermissionService } from "../../hooks"
import { ButtonType, IPermission } from "../../models"
import { combineClassNames } from "../../services"
import { permissionValidationSchema } from "../../schema"
import { Button } from "../Common"

interface IPermissionProps {
  permission?: IPermission
  refresh?: () => void
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
    <div className={combineClassNames("flex flex-col space-y-1", classes)}>
      <div className="flex justify-between">
        <label
          htmlFor="name"
          className={combineClassNames(
            "text-xs text-gray-600 uppercase font-semibold tracking-wider"
          )}
        >
          {label || placeholder || name}
        </label>
        {touched && errors && !disabled && (
          <span className={combineClassNames("text-xs text-red-600 uppercase font-semibold tracking-wider")}>
            {errors}
          </span>
        )}
      </div>
      <Field
        name={name}
        placeholder={placeholder || name}
        className={combineClassNames(
          "flex flex-1 bg-gray-900 px-3 py-2 rounded",
          disabled && "opacity-50",
          touched && errors && !disabled && "border border-red-500"
        )}
        disabled={disabled}
      />
    </div>
  )
}

const Permission = ({ permission, refresh }: IPermissionProps) => {

  const { updatePermission, addPermission, deletePermission } = usePermissionService(refresh)

  return (
    <Formik
      initialValues={permission || { name: '', description: '', language: 'en-US' }}
      onSubmit={(values) => {
        permission
          ? updatePermission(values, permission._id)
          : addPermission(values)
      }}
      validationSchema={permissionValidationSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex space-x-4">
          <PermissionField name='name' classes="basis-1/5" errors={errors.name} touched={touched.name} />
          <PermissionField name='description' classes="flex-grow" errors={errors.name} touched={touched.name} />
          <PermissionField name='language' disabled errors={errors.name} touched={touched.name} />
          <div className="flex self-end pb-1 items-center w-1/5 justify-end">
            {permission ? (
              <>
                <Button buttonType={ButtonType.Tertiary} content='Update' />
                <Button buttonType={ButtonType.Cancel} Icon={TrashIcon} type="button" action={() => deletePermission(permission._id)}/>
              </>
            ) : (
              <>
                <Button buttonType={ButtonType.Tertiary} content='Add permission' Icon={PlusIcon} />
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Permission