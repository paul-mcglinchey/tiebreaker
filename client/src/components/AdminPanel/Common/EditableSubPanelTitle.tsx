import { Field } from "formik"
import { combineClassNames } from "../../../services"

interface IEditableSubPanelTitleProps {
  name: string
  placeholder: string
  subtitle?: boolean
}

export const EditableSubPanelTitle = ({ name, placeholder, subtitle }: IEditableSubPanelTitleProps) => {
  return (
    <Field 
      name={name} 
      placeholder={placeholder}
      className={combineClassNames(
        subtitle 
        ? "bg-transparent focus:outline-none font-light text-md tracking-wider text-gray-400" 
        : "bg-transparent focus:outline-none font-semibold text-xl"
      )} 
    />
  )
}

export default EditableSubPanelTitle