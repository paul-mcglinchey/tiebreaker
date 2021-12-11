import { Field } from "formik";
import StyledErrorMessage from "./StyledErrorMessage";
import StyledConfirmationMessage from "./StyledConfirmationMessage";

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
        className="appearance-none focus:outline-none border-2 border-gray-800 focus:border-purple-500 focus:bg-gray-900 placeholder-gray-700 bg-gray-800 rounded-sm py-2 px-4 text-gray-700 leading-tight"
        name={props.name}
        autoComplete={props.autocomplete}
        component={props.component}
        type={props.type}
      />
    </div>
  )
}

export default StyledField;