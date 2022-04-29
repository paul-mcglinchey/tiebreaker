import { useEmployeeService } from "../../../../hooks";
import { IEmployee } from "../../../../models";
import { combineClassNames } from "../../../../services";
import { ListSelector } from "../../../Common";

interface IEmployeeListSelectorProps {
  employeeIds: (string | undefined)[],
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

const EmployeeListSelector = ({ employeeIds, formValues, setFieldValue, fieldName = 'employees' }: IEmployeeListSelectorProps) => {

  const { getEmployee } = useEmployeeService()

  return (
    <ListSelector<string | undefined>
      fieldName={fieldName}
      values={employeeIds}
      formValues={formValues}
      setFieldValue={(e) => setFieldValue(e)}
      itemStyles={(selected) => combineClassNames(selected ? 'bg-green-400 text-gray-800' : 'bg-gray-800', 'flex p-4 rounded transition-all')}
      render={(employeeId) => (
        <div>
          <EmployeeListItem e={getEmployee(employeeId)} />
        </div>
      )}
    />
  )
}

export default EmployeeListSelector;