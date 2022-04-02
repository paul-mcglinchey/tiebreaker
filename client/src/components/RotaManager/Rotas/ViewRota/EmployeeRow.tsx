import { IEmployee, ISchedule } from "../../../../models";
import EmployeeCell from "./EmployeeCell";

interface IEmployeeRowProps {
  employee: IEmployee,
  schedule: ISchedule,
  dayCycle: number[]
}

const EmployeeRow = ({ employee, schedule, dayCycle }: IEmployeeRowProps) => {

  return (
    <tr className="bg-gray-900 border-gray-700">
      <th className="flex flex-col space-y-1 text-left px-6 py-6 tracking-wider">
        <div>
          {employee.name.firstName} {employee.name.lastName}
        </div>
        <div className="text-sm font-light">
          {employee.contactInfo.primaryEmail}
        </div>
      </th>
      {dayCycle.map((day: number) => (
        <td key={day} className="px-6 py-4 text-sm whitespace-nowrap text-gray-400">
          <div>
            <EmployeeCell employee={employee} schedule={schedule} day={day} />
          </div>
        </td>
      ))}
      <td className="px-6 text-center">
        49
      </td>
    </tr>
  )
}

export default EmployeeRow;