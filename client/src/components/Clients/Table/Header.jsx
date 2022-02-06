const Header = (props) => {
  return (
    <th
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
    >
      {props.children}
    </th>
  )
}

export default Header;