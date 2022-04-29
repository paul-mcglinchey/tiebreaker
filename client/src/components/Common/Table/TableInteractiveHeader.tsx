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
    <button className="flex items-center justify-between space-x-4" onClick={() => handleSorting()}>
      <span className='whitespace-nowrap text-xs font-bold uppercase'>
        {children}
      </span>
      <div>
        <SquareIconButton className="w-4 h-4 -mb-1" Icon={getButton()} />
      </div>
    </button>
  )
}

export default TableInteractiveHeader;