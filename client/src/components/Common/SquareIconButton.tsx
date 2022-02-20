import { IIconButtonProps } from "../../models";

const SquareIconButton = ({ Icon, action, textColor = "text-current", additionalClasses = "" }: IIconButtonProps) => {

  return (
    <button onClick={action} className="p-2">
      <Icon className={`h-8 w-8 ${textColor} ${additionalClasses}`} />
    </button>
  )
}

export default SquareIconButton;