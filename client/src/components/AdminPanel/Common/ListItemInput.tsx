import { IListItemInputProps } from "../../../models";

const ListItemInput = ({ updateListItem, name, value }: IListItemInputProps) => {
  return (
    <input
      name={name}
      onChange={(e) => updateListItem(e.target.value, e.target.name)}
      value={value}
      className="bg-gray-800 px-2 py-1 rounded text-gray-300"
    />
  )
}

export default ListItemInput;