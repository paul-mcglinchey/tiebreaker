import { Field } from "formik";

import { StyledConfirmationMessage, StyledErrorMessage } from ".";

const StyledField = (props) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <label className="block font-bold text-gray-500 mb-1 uppercase">
          {props.placeholder}
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
        className="appearance-none focus:outline-none border border-transparent focus:border-blue-800 placeholder-gray-700 bg-gray-800 rounded-sm py-2 px-4 text-gray-200 leading-tight"
        name={props.name}
        autoComplete={props.autocomplete}
        component={props.component}
        type={props.type}
      />
    </div>
  )
}

export default StyledField;