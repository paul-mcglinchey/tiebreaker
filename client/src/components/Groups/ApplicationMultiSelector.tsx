import { useApplicationService } from "../../hooks"
import { IApplication } from "../../models"
import { MultiSelector } from "../Common"

interface IApplicationMultiSelectorProps {
  formValues: number[]
  setFieldValue: (value: (number | undefined)[]) => void
  fieldName?: string
}

const ApplicationMultiSelector = ({ formValues, setFieldValue, fieldName = "applications" }: IApplicationMultiSelectorProps) => {

  const { applications, getApplication, count } = useApplicationService()

  return (
    <MultiSelector<number | undefined>
      fieldName={fieldName}
      values={applications.map(a => a.identifier)}
      totalValuesLength={count}
      toggleShowAll={() => { }}
      formValues={formValues}
      setFieldValue={(a) => setFieldValue(a)}
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