import { IFormSectionProps } from "../../models";
import { CustomCheckbox } from "../Forms";

const FormSection = ({ children, title, isActivatable, activator }: IFormSectionProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-400 tracking-wide">{title}</h3>
          {isActivatable && typeof activator === "function" && (
            <CustomCheckbox action={() => activator()} />
          )}
        </div>
        <hr className="mt-2 border-gray-700" />
      </div>
      {children}
    </div>
  )
}

export default FormSection;