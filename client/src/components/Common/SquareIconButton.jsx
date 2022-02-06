const SquareIconButton = ({ Icon, action, textColor = "text-current", additionalClasses = "" }) => {

  return (
    <button onClick={action} className="p-2">
      <Icon className={`h-8 w-8 ${textColor} ${additionalClasses}`} />
    </button>
  )
}

export default SquareIconButton;