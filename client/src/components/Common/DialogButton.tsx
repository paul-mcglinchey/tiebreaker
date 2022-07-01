import { IChildrenProps } from "../../models"
import { combineClassNames } from "../../services"

interface IDialogButtonProps {
  actions: (() => void)[]
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

const DialogButton = ({ actions, disabled = false, type = "button", children }: IDialogButtonProps & IChildrenProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={combineClassNames(
        "px-4 py-2 inline-flex justify-center rounded-md border border-transparent",
        "text-sm font-medium text-blue-200 bg-gray-700",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
        disabled ? "opacity-60" : "hover:bg-blue-700"
      )}
      onClick={() => actions.forEach(a => a())}
    >
      {children}
    </button>
  )
}

export default DialogButton