import { IconButtonSize } from "../../models"

interface IIconButtonProps {
  Icon: any,
  action?: () => void,
  colour?: string,
  additionalClasses?: string | boolean
  buttonSize?: IconButtonSize
}

const SquareIconButton = ({ Icon, action, colour = "text-current", additionalClasses = "", buttonSize = IconButtonSize.Medium }: IIconButtonProps) => {

  const getButtonSize = (): string => {
    return `h-${buttonSize} w-${buttonSize}`
  }

  const getColour = (): string => {
    return `text-${colour}`
  }

  return (
    <button onClick={action}>
      <Icon className={`${getButtonSize()} ${getColour()} ${additionalClasses} transform hover:scale-110 transition-transform`} />
    </button>
  )
}

export default SquareIconButton;