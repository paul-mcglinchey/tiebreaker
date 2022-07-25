import { useApplicationService } from "../../hooks"
import { IApplication } from "../../models"
import { MultiSelector } from "../Common"

interface IApplicationMultiSelectorProps {
  formValues: IApplication[]
  setFieldValue: (value: (IApplication | undefined)[]) => void
  fieldName?: string
}

const ApplicationMultiSelector = ({ formValues, setFieldValue, fieldName = "applications" }: IApplicationMultiSelectorProps) => {

  const { applications = [], getApplication, count } = useApplicationService()

  return (
    <MultiSelector<number | undefined>
      fieldName={fieldName}
      values={applications.map(a => a.id)}
      totalValuesLength={count}
      toggleShowAll={() => { }}
      formValues={formValues.map(fv => fv.id)}
      setFieldValue={(a) => setFieldValue(a.map(a => getApplication(a)))}
      render={(a) => (
        <div>
          <ApplicationSelector a={getApplication(a)} />
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