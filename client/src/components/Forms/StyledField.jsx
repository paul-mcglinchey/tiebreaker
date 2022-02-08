import { Field } from "formik";

import { StyledConfirmationMessage, StyledErrorMessage } from ".";

const StyledField = (props) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <label className="block font-bold text-gray-500 mb-1 uppercase">
          {props.label}
        </label>
        <div className="flex justify-end">
          {props.errors && props.touched ? (
            <StyledErrorMessage>{props.errors}</StyledErrorMessage>
          ) : null}
          {!props.errors && props.touched ? (
            <StyledConfirmationMessage />
          ) : null}
        </div>
      </div>
      <Field
        className="w-full h-10 appearance-none focus:outline-none border-2 border-gray-800 focus:border-blue-500 text-gray-300 bg-gray-800 rounded-sm py-2 px-4 leading-tight"
        name={props.name}
        autoComplete={props.autocomplete}
        component={props.component}
        type={props.type}
        as={props.as}
      />
    </div>
  )
}

export default StyledField;