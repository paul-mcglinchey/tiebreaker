import { SpinnerIcon } from '.';
import { combineClassNames } from '../../services';
import { ButtonType, IStatus } from '../../models';

export interface IButtonProps {
  status?: IStatus[],
  content?: string,
  buttonType?: ButtonType,
  type?: "button" | "submit" | "reset",
  action?: () => void,
  hideText?: boolean,
  Icon?: any,
  iconSide?: "left" | "right"
}

const getButtonClasses = (buttonType: ButtonType): string => {
  switch (buttonType) {
    case ButtonType.Primary:
      return "border-2 border-blue-600 text-blue-600 bg-transparent hover:text-gray-900 hover:bg-blue-600 hover:border-transparent focus:text-gray-900 focus:bg-blue-600"
    case ButtonType.Secondary:
      return "text-blue-500 bg-transparent border-blue-500 hover:text-gray-300 hover:bg-blue-500 focus:text-gray-300 focus:bg-blue-500"
    case ButtonType.Tertiary:
      return "border-0 text-blue-500 bg-transparent hover:text-blue-600 focus:text-blue-600"
    case ButtonType.Cancel:
      return "border border-transparent text-red-500 bg-transparent hover:text-red-700 hover:border-red-700"
    default:
      return "text-gray-300 border-gray-300 bg-transparent hover:text-gray-900 hover:bg-gray-300 focus:text-gray-900 focus:bg-gray-300"
  }
}

const Button = ({
  status = [],
  content = 'Submit',
  type = "submit",
  buttonType = ButtonType.Submission,
  action = () => { },
  hideText,
  Icon,
  iconSide = "right"
}: IButtonProps) => {
  return (
    <button className={
      combineClassNames(
        getButtonClasses(buttonType),
        "px-3 py-1 transition-all font-bold rounded flex space-x-2 items-center tracking-wider"
      )}
      onClick={action}
      type={type}
    >
      {status && status[status.length - 1]?.isLoading && (
        <SpinnerIcon className="w-5 h-5 text-white" />
      )}
      {Icon && (
        <div className={`self-center ${iconSide === "left" ? "order-first mr-2" : "order-last ml-2"}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      {!hideText && (
        <div>
          {content}
        </div>
      )}
    </button>
  )
}

export default Button;