import { MenuIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { IInteractiveHeaderProps } from '../../../models';
import { SquareIconButton } from '../../Common';

const InteractiveHeader = ({ 
  sortField, 
  sortDirection, 
  setSortField, 
  setSortDirection, 
  children, 
  value 
}: IInteractiveHeaderProps) => {

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
    <div className="flex items-center justify-between">
      <div>
        {children}
      </div>
      <div>
        <SquareIconButton additionalClasses="w-4 h-4" Icon={getButton()} action={handleSorting} />
      </div>
    </div>
  )
}

export default InteractiveHeader;