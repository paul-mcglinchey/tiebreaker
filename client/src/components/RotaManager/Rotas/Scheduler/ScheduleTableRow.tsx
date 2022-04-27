import { FieldArray } from "formik";
import { Fragment } from "react";
import { useEmployeeService } from "../../../../hooks";
import { IEmployeeSchedule, ISchedule, IScheduleShift } from "../../../../models";
import EmployeeCell from "./ScheduleTableRowItem";

interface IScheduleTableRowProps {
  employeeSchedule: IEmployeeSchedule,
  dayCycle: number[],
  employeeIndex: number,
  values: ISchedule,
  editing: boolean
}

const ScheduleTableRow = ({ employeeSchedule, dayCycle, employeeIndex, values, editing }: IScheduleTableRowProps) => {

  const { getEmployee } = useEmployeeService()
  const employee = getEmployee(employeeSchedule.employeeId)

  const getHours = (startHour: string, endHour: string) => {

    if (!startHour || !endHour || startHour.length === 0 || endHour.length === 0) {
      return 0;
    }

    let startValue: number = Number(startHour);
    let endValue = endHour;

    let start = Number(startValue);
    let end: number = 0;

    if (endValue?.toLowerCase().includes('f') || endValue?.toLowerCase().includes('c')) {
      end = 10;
    } else {
      end = Number(endValue);
    }

    let result = (end < 12 ? end + 12 : end) - (start < 8 ? start + 12 : start);
    return Number.isNaN(result) ? 0 : result;
  }

  const getTotalHours = () => {

    let shifts = values.employeeSchedules[employeeIndex]?.shifts;
    let total: number = 0;

    shifts && shifts.forEach((s: IScheduleShift) => {
      if (!s || !s.startHour || !s.endHour) return;

      total += getHours(s.startHour, s.endHour);
    })

    return total;
  }

  return (
    <tr className="bg-gray-900 border-gray-700">
      <th className="flex flex-col space-y-1 text-left px-6 py-6 tracking-wider">
        <div>
          {employee?.name.firstName || '--'} {employee?.name.lastName}
        </div>
        <div className="text-sm font-light">
          {employee?.contactInfo.primaryEmail || '--'}
        </div>
      </th>
      <FieldArray
        name="employeeSchedules"
        render={() => (
          <>
            {dayCycle.map((day: number, index: number) => (
              <Fragment key={index}>
                <td key={index} className="px-1 py-4 text-sm whitespace-nowrap text-gray-400">
                  <EmployeeCell employeeIndex={employeeIndex} index={index} employeeSchedule={employeeSchedule} values={values} day={day} editing={editing} />
                </td>
                <td>
                  <div className="p-1 border border-gray-800 rounded text-center w-8 font-semibold tracking-wide text-gray-400">
                    {getHours(values.employeeSchedules[employeeIndex]?.shifts[index]?.startHour || "", values.employeeSchedules[employeeIndex]?.shifts[index]?.endHour || "")}
                  </div>
                </td>
              </Fragment>
            ))}
          </>
        )}
      />
      <td className="px-6 text-center">
        {getTotalHours()}
      </td>
    </tr>
  )
}

export default ScheduleTableRow;