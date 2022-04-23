import { useEffect, useMemo } from "react";
import { IEmployeeSchedule, ISchedule } from "../../../../models"
import { ScheduleShiftInput } from "./Common";

interface IEmployeeCellProps {
  employeeSchedule: IEmployeeSchedule,
  values: ISchedule,
  day: number,
  employeeIndex: number,
  index: number,
  editing: boolean
}

const EmployeeCell = ({ values, day, employeeIndex, index, editing }: IEmployeeCellProps) => {

  const currentDate = useMemo(() => new Date(values.startDate || ""), [values.startDate]);
  currentDate.setDate(new Date(values.startDate || "").getDate() + day);
  //const currentISODate = currentDate.toISOString();

  let cellValues = values?.employeeSchedules[employeeIndex]?.shifts[index];

  useEffect(() => {
    if (cellValues) {
      cellValues.date = currentDate;
    }
  }, [cellValues, currentDate])

  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="flex items-center space-x-2 w-18 uppercase">
        {editing ? (
          <>
            <ScheduleShiftInput name={`employeeSchedules.${employeeIndex}.shifts.${index}.startHour`} />
            <div>
              -
            </div>
            <ScheduleShiftInput name={`employeeSchedules.${employeeIndex}.shifts.${index}.endHour`} />
          </>
        ) : (
          <>
            {cellValues?.startHour && cellValues?.endHour ? (
              <div className="flex text-lg font-bold items-center space-x-1">
                <div>{cellValues.startHour}</div>
                <div> - </div>
                <div>{cellValues.endHour}</div>
              </div>
            ) : (
              <div className="text-red-900 tracking-widest font-bold text-lg">
                OFF
              </div>
            )}
          </> 
        )}
      </div>
    </div>
  )
}

export default EmployeeCell;