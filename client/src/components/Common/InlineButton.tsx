interface IInlineButtonProps {
  children: any,
  color?: string,
  action: () => void
}

const InlineButton = ({ children, action, color }: IInlineButtonProps) => {
  return (
    <button
      type="button"
      onClick={action} 
      className={`flex justify-between uppercase text-sm px-2 py-1 font-medium tracking-wider hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors rounded-lg ${color}`}
    >
      {children}
    </button>
  )
}

export default InlineButton;