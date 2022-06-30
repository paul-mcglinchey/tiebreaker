import { IChildrenProps } from "../../models"

interface IDialogButtonProps {
  actions: (() => void)[]
}

const DialogButton = ({ actions, children }: IDialogButtonProps & IChildrenProps) => {
  return (
    <button
      type="button"
      className="focus:outline-none inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-200 bg-gray-700 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
      onClick={() => actions.forEach(a => a())}
    >
      {children}
    </button>
  )
}

export default DialogButton