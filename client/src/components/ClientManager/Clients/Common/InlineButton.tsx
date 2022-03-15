import { IInlineButtonProps } from "../../../../models";

const InlineButton = ({ children, action, color }: IInlineButtonProps) => {
  return (
    <button 
      onClick={action} 
      className={`flex justify-between uppercase text-sm px-2 py-1 font-medium tracking-wider hover:bg-gray-800 rounded-lg ${color}`}
    >
      {children}
    </button>
  )
}

export default InlineButton;