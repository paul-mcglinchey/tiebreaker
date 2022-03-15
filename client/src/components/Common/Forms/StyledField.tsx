import { Field } from "formik";

import { StyledErrorMessage } from ".";
import { IFieldProps } from "../../../models";

const StyledField = ({ name, label, errors, touched, autoComplete, component, type, as }: IFieldProps) => {
  return (
    <div className="flex flex-1 flex-col">
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
      <Field
        className="w-full h-10 appearance-none focus:outline-none border-2 border-gray-800 focus:border-blue-500 text-gray-300 bg-gray-800 rounded-sm py-2 px-4 leading-tight"
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