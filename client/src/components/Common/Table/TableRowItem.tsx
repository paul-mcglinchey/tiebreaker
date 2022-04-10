import { IChildrenProps } from "../../../models"

const TableRowItem = ({ children }: IChildrenProps) => {
  return (
    <td
      className="px-6 py-4 text-sm whitespace-nowrap text-gray-400 items-center"
    >
      {children}
    </td>
  )
}

export default TableRowItem;