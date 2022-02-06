const RowItem = (props) => {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-stone-500"
    >
      {props.children}
    </td>
  )
}

export default RowItem;