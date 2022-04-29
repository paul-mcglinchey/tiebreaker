import { useState } from "react";
import { useEmployeeService } from "../../../../hooks";
import { IEmployee } from "../../../../models";
import { combineClassNames } from "../../../../services";
import { ListSelector } from "../../../Common";

interface IEmployeeListSelectorProps {
  employees: IEmployee[],
  formValues: string[],
  setFieldValue: (value: (string | undefined)[]) => void
  fieldName?: string,
}

const EmployeeListItem = ({ e }: { e: IEmployee | undefined }) => {
  return e ? (
    <div className="flex flex-col text-left space-y-2 leading-loose">
      <div className="font-bold tracking-wider text-lg uppercase">{e.name.firstName} {e.name.lastName}</div>
      <div className="text-sm">{e.contactInfo.primaryEmail}</div>
    </div>
  ) : <></>
}

const EmployeeListSelector = ({ employees, formValues, setFieldValue, fieldName = 'employees' }: IEmployeeListSelectorProps) => {

  const { getEmployee } = useEmployeeService()
  const [employeeFilter, setEmployeeFilter] = useState<string | undefined>()

  return (
    <>
      <input name="filter" value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)} />
      <ListSelector<string | undefined>
        fieldName={fieldName}
        values={employees.filter(e => e._id && employeeFilter ? e.fullName?.toLowerCase().includes(employeeFilter.toLowerCase()) : true).map(e => e._id).slice(0, 5)}
        formValues={formValues}
        setFieldValue={(e) => setFieldValue(e)}
        itemStyles={(selected) => combineClassNames(selected ? 'bg-green-400 text-gray-800' : 'bg-gray-800', 'flex p-4 rounded transition-all')}
        render={(employeeId) => (
          <div>
            <EmployeeListItem e={getEmployee(employeeId)} />
          </div>
        )}
      />
      <div className="flex justify-end tracking-wider font-semibold">
        Showing 5 of {employees.length}
      </div>
    </>
  )
}

export default EmployeeListSelector;