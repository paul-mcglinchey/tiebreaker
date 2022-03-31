import { IChildrenProps } from "../../../models";
import { CustomCheckbox } from ".";

interface IFormSectionProps extends IChildrenProps {
  title: string,
  state?: boolean,
  setState?: (state: boolean) => void
}

const FormSection = ({ children, title, state, setState }: IFormSectionProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-400 tracking-wide">{title}</h3>
          {typeof state === "boolean" && typeof setState === "function" && (
            <CustomCheckbox state={state} setState={setState} />
          )}
        </div>
        <hr className="mt-2 border-gray-700" />
      </div>
      {children}
    </div>
  )
}

export default FormSection;