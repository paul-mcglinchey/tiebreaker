interface IListItemInputProps {
  onChange: (value: string, name: string) => void,
  name: string,
  placeholder?: string,
  value: string
}

const ListItemInput = ({ onChange, name, placeholder, value }: IListItemInputProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      value={value}
      className="bg-gray-800 px-2 py-1 rounded text-gray-300 placeholder-gray-500/60"
    />
  )
}

export default ListItemInput;