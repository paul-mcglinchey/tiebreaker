import { useEffect, useState } from "react";
import { useIsMounted } from "../../../../hooks";
import { IEmployeeSchedule, ISchedule, IScheduleShift } from "../../../../models"
import { ScheduleShiftInput } from "./Common";

interface IEmployeeCellProps {
  employeeSchedule: IEmployeeSchedule,
  schedule: ISchedule,
  day: number,
}

const EmployeeCell = ({ employeeSchedule, schedule, day }: IEmployeeCellProps) => {

  const currentDate = new Date(schedule.startDate);
  currentDate.setDate(new Date(schedule.startDate).getDate() + day);
  const currentISODate = currentDate.toISOString();

  const getEmployeeShift = () => {
    let shifts = employeeSchedule.shifts;
    let shift = shifts?.filter((s: IScheduleShift) => s.date.toString() === currentISODate)[0];

    return shift;
  }

  const [employeeShift, setEmployeeShift] = useState<IScheduleShift>(getEmployeeShift() || { date: currentDate, startHour: '', endHour: '', notes: '' });
  const isMounted = useIsMounted();

  const updateShift = () => {
    let shouldUpdateShift = employeeShift.startHour.length > 0 && employeeShift.endHour.length > 0;

    if (shouldUpdateShift) schedule = {
      ...schedule,
      employeeSchedules: schedule.employeeSchedules.map((e: IEmployeeSchedule) => {
        return e.employee._id === employeeSchedule.employee._id ? (
          e.shifts.filter((s: IScheduleShift) => s.date === currentDate).length > 0 ? {
            ...e,
            shifts: e.shifts.map((s: IScheduleShift) => s.date === currentDate
              ? employeeShift
              : s
            )
          } : {
            ...e,
            shifts: [...e.shifts, employeeShift]
          }
        ) : e
      })
    }
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
    isMounted() && updateShift();
  }, [employeeShift])

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="flex items-center space-x-2">
        {employeeShift && (
          <>
            {console.log(employeeShift.startHour.length > 0)}
            <ScheduleShiftInput name="startHour" value={employeeShift.startHour.length > 0 ? employeeShift.startHour : ''} onChange={(e) => setEmployeeShift({ ...employeeShift, startHour: e.target.value })} />
            <div className="font-extrabold"> - </div>
            <ScheduleShiftInput name="endHour" value={employeeShift.endHour} onChange={(e) => setEmployeeShift({ ...employeeShift, endHour: e.target.value })} />
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