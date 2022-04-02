import { IEmployeeSchedule, ISchedule } from "../../../../models";
import EmployeeCell from "./EmployeeCell";

interface IEmployeeRowProps {
  employeeSchedule: IEmployeeSchedule,
  schedule: ISchedule,
  setSchedule: React.Dispatch<React.SetStateAction<ISchedule>>,
  dayCycle: number[]
}

const EmployeeRow = ({ employeeSchedule, schedule, setSchedule, dayCycle }: IEmployeeRowProps) => {

  const { name, contactInfo } = employeeSchedule.employee;

  return (
    <tr className="bg-gray-900 border-gray-700">
      <th className="flex flex-col space-y-1 text-left px-6 py-6 tracking-wider">
        <div>
          {name.firstName} {name.lastName}
        </div>
        <div className="text-sm font-light">
          {contactInfo.primaryEmail}
        </div>
      </th>
      {dayCycle.map((day: number) => (
        <td key={day} className="px-6 py-4 text-sm whitespace-nowrap text-gray-400">
          <div>
            <EmployeeCell employeeSchedule={employeeSchedule} schedule={schedule} setSchedule={setSchedule} day={day} />
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