import { FieldHookConfig, useField } from "formik";
import { StyledErrorMessage } from "..";
import { combineClassNames } from "../../../services";

interface IFieldProps {
  label: string
  compact?: boolean
  errors: any,
  touched: any
  noAutocomplete?: boolean 
}

const StyledField = ({ label, errors, touched, placeholder, type = "text", compact = false, noAutocomplete, ...props }: IFieldProps & FieldHookConfig<string>) => {
  const [field] = useField(props)

  return (
    <div className={combineClassNames("flex flex-col grow w-full md:w-auto", type === "number" ? "md:grow-0" : "md:grow")}>
      {!compact && (
        <div className="flex justify-between">
          <label className="block font-bold text-sm text-gray-500 mb-1 uppercase">
            {label}
          </label>
          <div className="flex justify-end">
            {errors && touched ? (
              <StyledErrorMessage>{errors}</StyledErrorMessage>
            ) : null}
          </div>
        </div>
      )}
      <input className={combineClassNames(
          "w-full h-10 caret-gray-200 autofill:text-fill-gray-200 autofill:shadow-fill-black autofill:border-0 autofill:rounded text-gray-300 bg-gray-900 rounded py-2 px-4 leading-tight",
          "focus-visible:border-0 focus:border-0 border-0 focus-visible:outline-1 focus-visible:outline-blue-500 focus:outline-none",
          compact && errors && touched && 'border-red-500'
        )}
        {...field}
        placeholder={placeholder || label}
        type={type} 
        autoComplete={noAutocomplete ? "off" : "on"}
      />
    </div>
  )
}

export default StyledField;