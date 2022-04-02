import { combineClassNames } from "../../../../../services";

interface IScheduleShiftInputProps {
  name: string,
  value: string,
  onChange: (e: any) => void,
}

const ScheduleShiftInput = ({ name, value, onChange }: IScheduleShiftInputProps) => {
  return (
    <input
      className={combineClassNames(`w-10 h-10 focus:outline-none text-gray-200 bg-gray-800 rounded text-center font-semibold tracking-wider text-xl uppercase leading-loose`)}
      name={name}
      onChange={(e) => onChange(e)}
      value={value}
      maxLength={2}
    />
  )
}

export default ScheduleShiftInput;