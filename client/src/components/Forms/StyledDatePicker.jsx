import { Field } from 'formik';

import { StyledConfirmationMessage, StyledErrorMessage } from '.';

const StyledDatePicker = (props) => {
  return (
    <div className="flex flex-col md:max-w-1/3">
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
        className="w-full appearance-none focus:outline-none border-2 border-gray-800 rounded focus:border-purple-500 focus:bg-white text-gray-500 bg-gray-800 rounded-sm py-2 px-4 leading-tight"
        name={props.name}
        component={props.component}
      />
    </div >
  )
}

export default StyledDatePicker;