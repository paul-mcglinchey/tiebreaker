import { useEffect, useRef, useState } from "react";
import { IEmployee } from "../../../../models";
import { CustomCheckbox } from "../../../Common";

interface IStaffSelectorProps {
  employees: IEmployee[],
  setEmployeeIds: (employeeIds: string[]) => void
}

const StaffSelector = ({ employees, setEmployeeIds }: IStaffSelectorProps) => {

  const [selection, setSelection] = useState<string[]>([]);
  const componentIsMounted = useRef(true);

  const toggleInclusion = (_id: string) => {
    selection.includes(_id)
      ? setSelection(selection.filter((s: string) => s !== _id))
      : setSelection([...selection, _id])
  }

  useEffect(() => {
    componentIsMounted && setEmployeeIds(selection);

    return () => {
      componentIsMounted.current = false;
    }
  }, [selection])

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
            <CustomCheckbox state={selection.includes(e._id)} setState={() => toggleInclusion(e._id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StaffSelector;