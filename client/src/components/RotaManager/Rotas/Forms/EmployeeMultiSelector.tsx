import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useEmployeeService } from "../../../../hooks";
import { IEmployee } from "../../../../models";
import { combineClassNames } from "../../../../services";
import { MultiSelector, SquareIcon } from "../../../Common";

interface IEmployeeMultiSelectorProps {
  formValues: string[],
  setFieldValue: (value: (string | undefined)[]) => void
  fieldName?: string,
}

const EmployeeSelector = ({ e }: { e: IEmployee | undefined }) => {
  return e ? (
    <div className="flex flex-col text-left space-y-2 leading-loose">
      <div className="font-bold tracking-wider text-lg uppercase">{e.name.firstName} {e.name.lastName}</div>
      <div className="text-sm">{e.contactInfo.primaryEmail}</div>
    </div>
  ) : <></>
}

const EmployeeMultiSelector = ({ formValues, setFieldValue, fieldName = 'employees' }: IEmployeeMultiSelectorProps) => {

  const [employeeFilter, setEmployeeFilter] = useState<string>()
  const [showAll, setShowAll] = useState<boolean>(false)
  const toggleShowAll = () => setShowAll(!showAll)

  const { getEmployee, getEmployees } = useEmployeeService()
  const employees = getEmployees()

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center bg-gray-900 rounded focus-within:outline outline-1 outline-green-500 text-gray-300 h-10 pr-4 space-x-4">
        <input id="filter" autoComplete="off" className="w-full py-2 px-4 bg-gray-900 focus:outline-0 rounded caret-green-500" placeholder="Filter employees..." value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)} />
        <span className="hidden md:block p-0.5 px-1 text-sm text-gray-200 bg-blue-500 uppercase tracking-widest font-bold whitespace-pre rounded">CTRL + K</span>
        <SquareIcon Icon={SearchIcon} />
      </div>
      <MultiSelector<string | undefined>
        fieldName={fieldName}
        values={employees.filter(e => e._id && employeeFilter ? e.fullName?.toLowerCase().includes(employeeFilter.toLowerCase()) : true).map(e => e._id).slice(0, showAll ? employees.length : 5)}
        totalValuesLength={employees.length}
        toggleShowAll={toggleShowAll}
        formValues={formValues}
        setFieldValue={(e) => setFieldValue(e)}
        itemStyles={(selected) => combineClassNames(selected ? 'bg-green-400 text-gray-800' : 'text-gray-300 bg-gray-900', 'flex p-4 rounded transition-all')}
        render={(employeeId) => (
          <div>
            <EmployeeSelector e={getEmployee(employeeId)} />
          </div>
        )}
      />
    </div>
  )
}

export default EmployeeMultiSelector;