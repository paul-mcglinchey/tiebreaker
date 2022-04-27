import { FieldArray } from "formik";
import { IEmployee } from "../../../../models";
import { combineClassNames } from "../../../../services";

interface IEmployeeSelectorProps {
  name: string,
  items: IEmployee[],
  formValues: string[],
  setFieldValue: (value: string[]) => void
}

const toggleValue = (values: string[], value: string): string[] => {
  if (values.includes(value)) {
    values = values.filter((v: string) => v !== value)
  } else {
    values.push(value)
  }
  
  return values;
}

const EmployeeSelector = ({ name, items, formValues, setFieldValue }: IEmployeeSelectorProps) => {
  return (
    <FieldArray
      name={name}
      render={() => (
        <div className="flex flex-col space-y-3">
          {items && items.map((item: IEmployee, index: number) => (
            <button 
              type="button" 
              key={index} 
              className={combineClassNames(
                "flex flex-grow p-4 transition-colors justify-between items-center rounded",
                item._id && formValues.includes(item._id) ? 'bg-blue-500 text-gray-800' : 'bg-gray-800'
              )}
              onClick={() => item._id && setFieldValue(toggleValue(formValues, item._id))}
            >
              <div className="flex flex-col text-left space-y-2 leading-loose">
                <div className="font-bold tracking-wider text-lg uppercase">{item.name.firstName} {item.name.lastName}</div>
                <div className="text-sm">{item.contactInfo.primaryEmail}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    />
  )
}

export default EmployeeSelector;