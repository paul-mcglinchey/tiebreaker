import { useApplicationService } from "../../hooks"
import { IApplication } from "../../models"
import { combineClassNames } from "../../services"
import { MultiSelector } from "../Common"

interface IApplicationMultiSelectorProps {
  formValues: string[]
  setFieldValue: (value: (string | undefined)[]) => void
  fieldName?: string
}

const ApplicationMultiSelector = ({ formValues, setFieldValue, fieldName = "applications" }: IApplicationMultiSelectorProps) => {

  const { applications, getApplication, count } = useApplicationService()

  return (
    <MultiSelector<string | undefined>
      fieldName={fieldName}
      values={applications.map(a => a.identifier)}
      totalValuesLength={count}
      toggleShowAll={() => { }}
      formValues={formValues}
      setFieldValue={(a) => setFieldValue(a)}
      itemStyles={(selected) => combineClassNames(selected ? 'bg-green-400 text-gray-800' : 'text-gray-300 bg-gray-900', 'flex p-4 rounded transition-all')}
      render={(identifier) => (
        <div>
          <ApplicationSelector a={getApplication(identifier)} />
        </div>
      )}
    />
  )
}

const ApplicationSelector = ({ a }: { a: IApplication | undefined }) => {
  return a ? (
    <div className="flex flex-col text-left space-y-2 leading-loose">
      <div className="font-bold tracking-wider text-lg uppercase">{a.name}</div>
      <div className="text-sm">{a.description}</div>
    </div>
  ) : <></>
}

export default ApplicationMultiSelector