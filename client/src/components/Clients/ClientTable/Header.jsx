import { MenuIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { SquareIconButton } from '../../Common';

const Header = ({ sortField, sortDirection, setSortField, setSortDirection, children, value }) => {

  const getButton = () => {
    if (sortField === value) {
      return sortDirection === "descending" ? ArrowDownIcon : ArrowUpIcon;
    } else {
      return MenuIcon;
    }
  }

  const handleSorting = () => {
    sortField === value ? toggleSortDirection() : setSortField(value);
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "descending" ? "ascending" : "descending");
  }

  return (
    <th
      scope="col"
      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
    >
      <div className="flex items-center justify-between">
        <div>
          {children}
        </div>
        <div>
          <SquareIconButton additionalClasses="w-4 h-4" Icon={getButton()} action={handleSorting} />
        </div>
      </div>
    </th>
  )
}

export default Header;