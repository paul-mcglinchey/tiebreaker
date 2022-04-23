import { IChildrenProps } from "../../../models";
import { combineClassNames } from "../../../services";
import { SquareIconButton, CustomCheckbox } from "..";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface IFormSectionProps extends IChildrenProps {
  title: string,
  state?: boolean,
  setState?: (state: boolean) => void,
  showExpander?: boolean,
  expanded?: boolean
  expanderAction?: () => void
}

const FormSection = ({ children, title, state, setState, showExpander, expanded, expanderAction }: IFormSectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between items-center px-2 pb-4 text-gray-400">
          <h3 className="text-2xl font-semibold tracking-wide">{title}</h3>
          {typeof state === "boolean" && typeof setState === "function" && (
            <CustomCheckbox state={state} setState={setState} />
          )}
          {showExpander && expanderAction && (
            <SquareIconButton Icon={ChevronUpIcon} action={() => expanderAction()} className={combineClassNames("transform", expanded && "rotate-180")} />
          )}
        </div>
        <hr className="border-gray-700" />
      </div>
      {children}
    </div>
  )
}

export default FormSection;