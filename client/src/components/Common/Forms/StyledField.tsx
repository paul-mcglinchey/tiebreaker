import { Field } from "formik";
import { StyledErrorMessage } from "..";
import { combineClassNames } from "../../../services";

interface IFieldProps {
  name: string,
  label: string,
  errors: any,
  touched: any,
  autoComplete?: string,
  component?: React.ReactNode,
  type?: string,
  as?: string,
  compact?: boolean
}

const StyledField = ({ name, label, errors, touched, autoComplete, component, type, as, compact }: IFieldProps) => {
  return (
    <div className="flex flex-grow flex-col w-full">
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
      <Field
        className={combineClassNames(
          `w-full h-10 appearance-none focus:outline-none border-2 focus:border-blue-500 text-gray-300 bg-gray-800 rounded py-2 px-4 leading-tight`,
          compact && errors && touched ? 'border-red-500' : 'border-transparent'
        )}
        placeholder={compact && label}
        name={name}
        autoComplete={autoComplete}
        component={component}
        type={type}
        as={as}
      />
    </div>
  )
}

export default StyledField;