import { PlusIcon, TrashIcon } from "@heroicons/react/solid"
import { Field, Form, Formik } from "formik"
import { ButtonType, IApplication } from "../../models"
import { combineClassNames } from "../../services"
import { applicationValidationSchema } from "../../schema"
import { Button } from "../Common"
import { useApplicationsService } from "../../hooks"

interface IApplicationProps {
  application?: IApplication
  refresh?: () => void
}

interface IApplicationFieldProps {
  name: string
  placeholder?: string
  label?: string
  classes?: string
  disabled?: boolean
  errors?: string | undefined
  touched?: boolean | undefined
}

const ApplicationField = ({ name, placeholder, label, classes, disabled, errors, touched }: IApplicationFieldProps) => {
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

const Application = ({ application, refresh }: IApplicationProps) => {

  const { updateApplication, addApplication, deleteApplication } = useApplicationsService(refresh)

  return (
    <Formik
      initialValues={application || { identifier: '', name: '', description: '', icon: '', url: '' }}
      onSubmit={(values) => {
        application
          ? updateApplication(values, application._id)
          : addApplication(values)
      }}
      validationSchema={applicationValidationSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex space-x-4">
          <ApplicationField name='identifier' classes="basis-1/5" errors={errors.identifier} touched={touched.identifier} />
          <ApplicationField name='name' classes="basis-1/5" errors={errors.name} touched={touched.name} />
          <ApplicationField name='description' classes="flex-grow" errors={errors.name} touched={touched.name} />
          <ApplicationField name='icon' label="Icon URL" errors={errors.icon} touched={touched.icon} />
          <ApplicationField name='url' label="Url/Route" errors={errors.url} touched={touched.url} />
          <div className="flex self-end pb-1 items-center w-1/5 justify-end">
            {application ? (
              <>
                <Button buttonType={ButtonType.Tertiary} content='Update' />
                <Button buttonType={ButtonType.Cancel} Icon={TrashIcon} type="button" action={() => deleteApplication(application._id)}/>
              </>
            ) : (
              <>
                <Button buttonType={ButtonType.Tertiary} content='Add Application' Icon={PlusIcon} />
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Application