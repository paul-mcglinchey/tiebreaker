import { Link } from "react-router-dom";

const InlineLink = ({ children, color, to }) => {
  return (
    <Link to={to} className={`flex flex-nowrap items-center space-x-2 uppercase text-sm px-2 py-1 font-medium tracking-wider hover:bg-gray-800 rounded-lg ${color}`}>{children}</Link>
  )
}

export default InlineLink;