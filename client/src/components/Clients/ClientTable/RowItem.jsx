const RowItem = (props) => {
  return (
    <td
      className="px-6 py-4 text-sm whitespace-nowrap text-gray-400"
    >
      {props.children}
    </td>
  )
}

export default RowItem;