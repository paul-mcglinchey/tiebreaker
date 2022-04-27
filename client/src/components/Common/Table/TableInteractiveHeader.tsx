import { MenuIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';
import { IChildrenProps, ISortable, SortDirection } from '../../../models';
import { SquareIconButton } from '..';

interface IInteractiveHeaderProps extends ISortable, IChildrenProps {
  value: string
}

const TableInteractiveHeader = ({ 
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
    setSortDirection(sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc);
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        {children}
      </div>
      <div>
        <SquareIconButton className="w-4 h-4" Icon={getButton()} action={handleSorting} />
      </div>
    </div>
  )
}

export default TableInteractiveHeader;