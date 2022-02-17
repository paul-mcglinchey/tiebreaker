import { Link } from "react-router-dom";
import { classNames } from "../../../utilities";

const InlineLink = ({ children, color, to, isActive }) => {
  return (
    <Link 
      to={to} 
      className={classNames(
        "flex flex-nowrap items-center space-x-2 uppercase text-sm px-2 py-1 font-medium tracking-wider hover:bg-gray-800 rounded-lg", 
        isActive && "bg-gray-800",
        color  
      )}
    >
      {children}
    </Link>
  )
}

export default InlineLink;