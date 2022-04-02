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
    <div className="flex flex-1 flex-col space-y-2">
      {employees.map((e: IEmployee) => (
        <div className="flex flex-grow justify-between py-2 px-2 bg-gray-900 rounded-lg">
          <div className="">
            <div>
              {e.name.firstName} {e.name.lastName}
            </div>
            <div>
              {e.contactInfo.primaryEmail}
            </div>
          </div>
          <div>
            <CustomCheckbox state={employeeIds.includes(e._id)} setState={() => toggleInclusion(e._id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StaffSelector;