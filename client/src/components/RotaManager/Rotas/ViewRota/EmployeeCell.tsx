import { useEffect, useRef, useState } from "react";
import { IEmployee, ISchedule, IScheduleEmployees, IScheduleShift } from "../../../../models"
import { combineClassNames } from "../../../../services";

interface IEmployeeCellProps {
  employee: IEmployee,
  schedule: ISchedule,
  day: number
}

const EmployeeCell = ({ employee, schedule, day }: IEmployeeCellProps) => {

  const currentDate = new Date(schedule.startDate)
  currentDate.setDate(new Date(schedule.startDate).getDate() + day);

  const [employeeShift, setEmployeeShift] = useState<IScheduleShift>({ date: currentDate, startHour: '', endHour: '', notes: '' });
  const componentIsMounted = useRef(true);

  const getEmployeeShift = () => {
    let shifts = schedule.employees.filter((e: IScheduleEmployees) => e.employee._id === employee._id)[0]?.shifts;
    let shift = shifts?.filter((s: IScheduleShift) => s.date === currentDate)[0];

    shift && componentIsMounted.current && setEmployeeShift(shift);
  }

  const updateShift = (name: string, e: any) => {
    let value = e.target.value;
    let update = { ...employeeShift, [name]: value };

    schedule.employees.forEach((e: IScheduleEmployees) => {
      if (e.employee._id === employee._id) {
        e.shifts.filter((s: IScheduleShift) => s.date === currentDate).length > 0
          ? e.shifts.map((s: IScheduleShift) => s.date === currentDate ? update : s)
          : e.shifts.push(update)
      }
    })

    console.log(schedule);

    setEmployeeShift({ ...employeeShift, [name]: value })
  }

  const getShiftLength = () => {
    let start = Number(employeeShift.startHour);
    let end: number = 0;

    if (employeeShift.endHour.toLowerCase().includes('f') || employeeShift.endHour.toLowerCase().includes('c')) {
      end = 10;
    } else {
      end = Number(employeeShift.endHour);
    }

    return (end < 12 ? end + 12 : end) - (start < 8 ? start + 12 : start);
  }

  useEffect(() => {

    componentIsMounted.current && getEmployeeShift();

    return () => {
      componentIsMounted.current = false;
    }
  }, [])

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="flex items-center space-x-2">
        <ScheduleShiftInput name="startHour" value={employeeShift.startHour} onChange={(e) => updateShift(e.target.name, e)} />
        <div className="font-extrabold"> - </div>
        <ScheduleShiftInput name="endHour" value={employeeShift.endHour} onChange={(e) => updateShift(e.target.name, e)} />
      </div>
      <div className="font-bold border border-gray-700 rounded p-2">
        {getShiftLength()}
      </div>
    </div>
  )
}

export default EmployeeCell;

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