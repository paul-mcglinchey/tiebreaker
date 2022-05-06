import { Field } from "formik";
import { combineClassNames } from "../../services";

interface IScheduleShiftInputProps {
  name: string
}

const ScheduleShiftInput = ({ name }: IScheduleShiftInputProps) => {
  return (
    <Field
      className={combineClassNames(`w-8 p-1 caret-blue-500 focus:outline-none text-gray-200 bg-gray-800 rounded text-center font-semibold tracking-wider text-base md:text-xl uppercase leading-loose`)}
      name={name}
      maxLength={2}
    />
  )
}

export default ScheduleShiftInput;