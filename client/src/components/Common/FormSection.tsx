import { ChevronUpIcon } from "@heroicons/react/solid";
import { IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { SquareIconButton, Switch } from ".";

interface IFormSectionProps extends IChildrenProps {
  title: string
  classes?: string
  state?: boolean
  setState?: (state: boolean) => void
  showExpander?: boolean
  expanded?: boolean
  expanderAction?: () => void
}

const FormSection = ({ children, title, classes, state, setState, showExpander, expanded, expanderAction }: IFormSectionProps) => {
  return (
    <div className={combineClassNames("flex flex-col", classes)}>
      <div className="mb-2">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-2xl font-semibold tracking-wide">{title}</h3>
          {typeof state === "boolean" && typeof setState === "function" && (
            <Switch enabled={state} setEnabled={() => setState(true)} description="" />
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