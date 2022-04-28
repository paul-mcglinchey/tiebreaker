import { render } from "@testing-library/react"
import { FieldArray } from "formik"
import { Children } from "react"
import { combineClassNames } from "../../../services"

interface IListSelectorProps<TValue> {
  fieldName: string,
  values: TValue[],
  formValues: TValue[],
  setFieldValue: (value: TValue[]) => void
  render: (value: TValue) => JSX.Element
}

const ListSelector = <TValue extends unknown>({ fieldName, values, formValues, setFieldValue, render }: IListSelectorProps<TValue>) => {

  const toggleValue = (value: TValue): TValue[] => {
    if (formValues.includes(value)) {
      formValues = formValues.filter((v: TValue) => v !== value)
    } else {
      formValues.push(value)
    }
    
    return formValues;
  }

  return (
    <FieldArray
      name={fieldName}
      render={() => (
        <div className="flex flex-col space-y-3">
          {values && values.map((value: TValue, index: number) => (
            <button 
              type="button" 
              key={index} 
              className={combineClassNames(
                "flex flex-grow p-4 transition-colors justify-between items-center rounded",
                 formValues.includes(value) ? 'bg-blue-500 text-gray-800' : 'bg-gray-800'
              )}
              onClick={() => setFieldValue(toggleValue(value))}
            >
              {render(value)}
            </button>
          ))}
        </div>
      )}
    />
  )
}

export default ListSelector