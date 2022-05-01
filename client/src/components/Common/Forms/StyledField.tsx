import { FieldHookConfig, useField } from "formik";
import { StyledErrorMessage } from "..";
import { combineClassNames } from "../../../services";

interface ITestFieldProps {
  label: string
  compact?: boolean
  errors: any,
  touched: any
}

const StyledField = ({ label, errors, touched, placeholder, type = "text", compact = false, ...props }: ITestFieldProps & FieldHookConfig<string>) => {
  const [field] = useField(props)

  return (
    <div className={combineClassNames("flex flex-col grow w-full md:w-auto", type === "number" ? "md:grow-0" : "md:grow")}>
      {!compact && (
        <div className="flex justify-between">
          <label className="block font-bold text-gray-500 mb-1 uppercase">
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
          `w-full h-10 caret-gray-200 focus:outline-none border-transparent autofill:text-fill-gray-200 autofill:shadow-fill-gray-800 autofill:rounded autofill:outline-none focus:border-blue-500 text-gray-300 bg-gray-800 rounded py-2 px-4 leading-tight`,
          compact && errors && touched && 'border-red-500'
        )}
        {...field}
        placeholder={placeholder || label}
        type={type} 
      />
    </div>
  )
}

export default StyledField;