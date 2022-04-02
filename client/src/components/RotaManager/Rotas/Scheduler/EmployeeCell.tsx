import { useEffect, useRef } from "react";
import { useIsMounted } from "../../../../hooks";
import { IEmployeeSchedule, ISchedule, IScheduleShift } from "../../../../models"
import { ScheduleShiftInput } from "./Common";

interface IEmployeeCellProps {
  employeeSchedule: IEmployeeSchedule,
  schedule: ISchedule,
  setSchedule: React.Dispatch<React.SetStateAction<ISchedule>>
  day: number,
}

const EmployeeCell = ({ employeeSchedule, schedule, setSchedule, day }: IEmployeeCellProps) => {

  const currentDate = new Date(schedule.startDate);
  currentDate.setDate(new Date(schedule.startDate).getDate() + day);
  const currentISODate = currentDate.toISOString();

  const getEmployeeShift = () => {
    let shifts = employeeSchedule.shifts;
    let shift = shifts?.filter((s: IScheduleShift) => s.date.toString() === currentISODate)[0];

    return shift;
  }

  const employeeShift = useRef<IScheduleShift>(getEmployeeShift() || { date: currentDate, startHour: '', endHour: '', notes: ''});
  const isMounted = useIsMounted();

  const updateShift = () => {
    let shift: IScheduleShift = { date: employeeShift.current.date, startHour: employeeShift.current.startHour, endHour: employeeShift.current.endHour, notes: employeeShift.current.notes };
    let shouldUpdateShift = shift && shift.startHour.length > 0 && shift.endHour.length > 0;

    shouldUpdateShift && shift && setSchedule(pSchedule => {
      return {
        ...pSchedule,
        employeeSchedules: pSchedule.employeeSchedules.map((e: IEmployeeSchedule) => {
          return e.employee._id === employeeSchedule.employee._id ? (
            e.shifts.filter((s: IScheduleShift) => s.date === currentDate).length > 0 ? {
              ...e,
              shifts: e.shifts.map((s: IScheduleShift) => s.date === currentDate 
                ? shift
                : s
              )
            } : {
              ...e,
              shifts: [...e.shifts, shift]
            }
          ) : e
        })
      }
    })
  }

  const getShiftLength = () => {
    let start = Number(employeeShift?.current.startHour);
    let end: number = 0;

    if (employeeShift?.current.endHour.toLowerCase().includes('f') || employeeShift?.current.endHour.toLowerCase().includes('c')) {
      end = 10;
    } else {
      end = Number(employeeShift?.current.endHour);
    }

    return (end < 12 ? end + 12 : end) - (start < 8 ? start + 12 : start);
  }

  useEffect(() => {
    isMounted() && updateShift();
  }, [employeeShift])

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="flex items-center space-x-2">
        {employeeShift && (
          <>
            {console.log(employeeShift.current.startHour.length > 0)}
            <ScheduleShiftInput name="startHour" value={employeeShift.current.startHour.length > 0 ? employeeShift.current.startHour : ''} onChange={(e) => employeeShift.current.startHour = e.target.value} />
            <div className="font-extrabold"> - </div>
            <ScheduleShiftInput name="endHour" value={employeeShift.current.endHour} onChange={(e) => employeeShift.current.endHour = e.target.value} />
          </>
        )}
      </div>
      <div className="font-bold border border-gray-700 rounded p-2 w-10 text-center">
        {getShiftLength()}h
      </div>
    </div>
  )
}

export default EmployeeCell;