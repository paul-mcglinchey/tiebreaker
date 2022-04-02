import { IEmployee, ISchedule } from "../../../../models";
import EmployeeCell from "./EmployeeCell";

interface IEmployeeRowProps {
  employee: IEmployee,
  schedule: ISchedule,
  dayCycle: number[]
}

const EmployeeRow = ({ employee, schedule, dayCycle }: IEmployeeRowProps) => {

  return (
    <tr>
      <th>{employee.name.firstName} {employee.name.lastName}</th>
      {dayCycle.map((day: number) => (
        <td key={day}>
          <div>
            <EmployeeCell employee={employee} schedule={schedule} day={day} />
          </div>
        </td>
      ))}
    </tr>
  )
}

export default EmployeeRow;