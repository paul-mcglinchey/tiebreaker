import { Field } from "formik";
import { combineClassNames } from "../../services";

interface IScheduleShiftInputProps {
  name: string
}

const ScheduleShiftInput = ({ name }: IScheduleShiftInputProps) => {
  return (
    <Field
      className={combineClassNames(`w-10 focus:outline-none text-gray-200 bg-gray-800 rounded text-center font-semibold tracking-wider text-xl uppercase leading-loose`)}
      name={name}
      maxLength={2}
    />
  )
}

export default ScheduleShiftInput;