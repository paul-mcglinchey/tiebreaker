import { combineClassNames } from "../../../services"

interface ICheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
  label: string
  hideLabel?: boolean
}

const Checkbox = ({ checked, onChange, id, label, hideLabel = false }: ICheckboxProps) => {
  return (
    <div className="flex space-x-2 items-center">
      <button type="button" className={combineClassNames("h-5 w-5 rounded transition-all", checked ? 'bg-blue-500' : 'bg-gray-200')} id={id} onClick={onChange} />
      <label htmlFor={id} className={`font-semibold tracking-wider ${hideLabel && 'sr-only'}`}>{label}</label>
    </div>
  )
}

export default Checkbox