import { FieldHookConfig, useField } from "formik"
import { combineClassNames } from "../../services"

interface IFieldProps {
  label: string
  compact?: boolean
  errors: any,
  touched: any
  noAutocomplete?: boolean
  disabled?: boolean
  classes?: string
}

const StyledField = ({ label, errors, touched, placeholder, type = "text", compact = false, noAutocomplete, disabled = false, classes, ...props }: IFieldProps & FieldHookConfig<string>) => {
  const [field] = useField(props)

  return (
    <div className={combineClassNames("flex flex-col grow w-full md:w-auto", classes, type === "number" ? "md:grow-0" : "md:grow")}>
      {!compact && (
        <div className="flex justify-between">
          <label className="block font-bold text-sm text-gray-500 mb-1 uppercase">
            {label}
          </label>
          <div className="flex justify-end">
            {errors && touched && (
              <div className="text-red-500 uppercase font-bold text-opacity-80 text-sm">
                <span className="inline-block align-middle">
                  {errors}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <input className={combineClassNames(
        "w-full h-10 caret-gray-200 autofill:text-fill-gray-200 autofill:shadow-fill-black autofill:border-0 autofill:rounded text-gray-300 bg-gray-900 rounded py-2 px-4 leading-tight",
        "focus-visible:border-0 focus:border-0 border-0 focus-visible:outline-1 focus-visible:outline-blue-500 focus:outline-none",
        compact && errors && touched && 'border-red-500',
        disabled && "text-opacity-40"
      )}
        {...field}
        placeholder={compact ? (placeholder || label) : placeholder}
        disabled={disabled}
        type={type}
        autoComplete={noAutocomplete ? "off" : "on"}
      />
    </div>
  )
}

export default StyledField;