import { Field } from 'formik';

import { StyledErrorMessage } from '.';
import { IFieldProps } from '../../models';

const StyledDatePicker = ({ name, label, errors, touched, component }: IFieldProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between space-x-2 items-middle">
        <label className="font-bold text-gray-500 mb-1 uppercase">
          {label}
        </label>
        <div className="flex">
          {errors && touched ? (
            <StyledErrorMessage>{errors}</StyledErrorMessage>
          ) : null}
        </div>
      </div>
      <Field
        className="w-64 h-10 appearance-none focus:outline-none border-2 border-gray-800 focus:border-blue-500 text-gray-300 bg-gray-800 rounded-sm py-2 px-4 leading-tight"
        name={name}
        component={component}
      />
    </div >
  )
}

export default StyledDatePicker;