import { IChildrenProps } from "../../../models";

const RowItem = ({ children }: IChildrenProps) => {
  return (
    <td
      className="px-6 py-4 text-sm whitespace-nowrap text-gray-400"
    >
      {children}
    </td>
  )
}

export default RowItem;