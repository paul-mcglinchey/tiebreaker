import { IEmployee } from "../../../../models";
import { CustomCheckbox } from "../../../Common";

interface IStaffSelectorProps {
  employees: IEmployee[],
  employeeIds: string[]
  setEmployeeIds: (employeeIds: string[]) => void
}

const StaffSelector = ({ employees, employeeIds, setEmployeeIds }: IStaffSelectorProps) => {

  const toggleInclusion = (_id: string) => {
    employeeIds.includes(_id)
      ? setEmployeeIds(employeeIds.filter((s: string) => s !== _id))
      : setEmployeeIds([...employeeIds, _id])
  }

  return (
    <div className="flex flex-1 flex-col space-y-2 bg-gray-900 p-4 rounded">
      {employees.map((e: IEmployee) => (
        <div className="flex flex-grow justify-between pb-4 border-b border-gray-600 last:border-0 last:pb-0">
          <div className="flex flex-col space-y-1">
            <div className="uppercase tracking-wider font-semibold text-lg">
              {e.name.firstName} {e.name.lastName}
            </div>
            <div className="text-sm text-gray-600">
              {e.contactInfo.primaryEmail}
            </div>
          </div>
          <div>
            <CustomCheckbox state={employeeIds.includes(e._id || "")} setState={() => toggleInclusion(e._id || "")} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StaffSelector;