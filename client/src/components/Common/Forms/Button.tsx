import { SpinnerIcon } from '..';
import { combineClassNames } from '../../../services';
import { ButtonType, IStatus } from '../../../models';

export interface IButtonProps {
  status?: IStatus[],
  content?: string,
  buttonType?: ButtonType,
  type?: "button" | "submit" | "reset",
  action?: () => void
}

const getButtonClasses = (buttonType: ButtonType): string => {
  switch (buttonType) {
    case ButtonType.Primary:
      return "border-0 text-gray-200 bg-blue-500 hover:text-gray-300 hover:bg-blue-600 focus:text-gray-300 focus:bg-blue-500"
    case ButtonType.Secondary:
      return "text-blue-500 bg-transparent border-blue-500 hover:text-gray-300 hover:bg-blue-500 focus:text-gray-300 focus:bg-blue-500"
    case ButtonType.Tertiary:
      return "border-0 text-blue-500 bg-transparent hover:text-blue-600 focus:text-blue-600"
    default:
      return "text-gray-300 border-gray-300 bg-transparent hover:text-gray-900 hover:bg-gray-300 focus:text-gray-900 focus:bg-gray-300"
  }
}

const Button = ({ status = [], content = 'Submit', type = "submit", buttonType = ButtonType.Submission, action = () => {} }: IButtonProps) => {
  return (
    <button className={
      combineClassNames(
        getButtonClasses(buttonType),
        "px-3 py-1 border transition-all font-bold rounded flex space-x-2 items-center tracking-wider"
      )}
      onClick={action}
      type={type}>
      {status && status[status.length - 1]?.isLoading && (
        <SpinnerIcon className="w-5 h-5 text-white" />
      )}
      <div>
        {content}
      </div>
    </button>
  )
}

export default Button;