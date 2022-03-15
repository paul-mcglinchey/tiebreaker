import { IChildrenProps } from "../../../../models";

const Header = ({ children }: IChildrenProps) => {

  return (
    <th
      scope="col"
      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-400 uppercase w-1/4"
    >
      {children}
    </th>
  )
}

export default Header;