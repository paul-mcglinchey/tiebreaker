const InlineButton = ({ title, action, color }) => {
  return (
    <button onClick={action} className={`uppercase text-sm px-2 py-1 font-medium tracking-wider hover:bg-gray-800 rounded-lg ${color}`}>{title}</button>
  )
}

export default InlineButton;