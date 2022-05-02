import { combineClassNames } from '../../services';
import { ButtonType, INotification } from '../../models';

export interface IButtonProps {
  status?: INotification[],
  content?: string,
  buttonType?: ButtonType,
  type?: "button" | "submit" | "reset",
  action?: () => void,
  hideText?: boolean,
  Icon?: any,
  iconSide?: "left" | "right"
  XL?: boolean
}

const getButtonClasses = (buttonType: ButtonType): string => {
  switch (buttonType) {
    case ButtonType.Primary:
      return "border-2 border-blue-600 text-blue-600 bg-transparent hover:text-gray-900 hover:bg-blue-600 hover:border-transparent focus:text-gray-900 focus:bg-blue-600"
    case ButtonType.Secondary:
      return "text-blue-500 bg-transparent border-blue-500 hover:text-gray-300 hover:bg-blue-500 focus:text-gray-300 focus:bg-blue-500"
    case ButtonType.Tertiary:
      return "border border-transparent text-blue-500 bg-transparent hover:border-blue-600"
    case ButtonType.Cancel:
      return "border border-transparent text-red-500 bg-transparent hover:border-red-700"
    case ButtonType.Confirm:
      return "text-green-500 bg-transparent hover:text-green-600"
    default:
      return "border text-gray-300 border-gray-300 bg-transparent hover:text-gray-900 hover:bg-gray-300 focus:text-gray-900 focus:bg-gray-300"
  }
}

const Button = ({
  content,
  type = "submit",
  buttonType = ButtonType.Submission,
  action = () => { },
  hideText,
  Icon,
  iconSide = "right",
  XL = false
}: IButtonProps) => {
  return (
    <button className={
      combineClassNames(
        getButtonClasses(buttonType),
        content ? "px-3" : "px-1",
        "py-1 transition-all font-bold rounded flex items-center justify-center tracking-wider",
        XL && "text-xl"
      )}
      onClick={action}
      type={type}
    >
      {Icon && (
        <div className={`self-center ${content && (iconSide === "left" ? "order-first mr-2" : "order-last ml-2")}`}>
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