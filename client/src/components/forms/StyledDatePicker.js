import { Field } from 'formik';
import StyledConfirmationMessage from "./StyledConfirmationMessage";
import StyledErrorMessage from "./StyledErrorMessage";

const StyledDatePicker = (props) => {
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
        className="appearance-none focus:outline-none border-2 border-gray-200 rounded focus:border-purple-500 focus:bg-white placeholder-gray-700 bg-gray-200 rounded-sm py-2 px-4 text-gray-700 leading-tight"
        name={props.name}
        component={props.component}
      />
    </div >
  )
}

export default StyledDatePicker;