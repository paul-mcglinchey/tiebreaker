import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { SquareIconButton } from "..";

interface IPaginatorProps {
  pageSize: number,
  pageNumber: number,
  setPageNumber: (page: number) => void,
  setPageSize: (size: number) => void,
  totalItems: number
  itemType?: string
}

const Paginator = ({ pageSize, pageNumber, setPageNumber, setPageSize, totalItems, itemType = 'items' }: IPaginatorProps) => {

  const isMinPage = () => pageNumber <= 1;
  const isMaxPage = () => pageNumber >= Math.ceil(totalItems / pageSize);

  const decrementPageNumber = () => {
    !isMinPage() && setPageNumber(pageNumber - 1);
  }

  const incrementPageNumber = () => {
    !isMaxPage() && setPageNumber(pageNumber + 1);
  }

  const updatePageSize = (ps: number) => {
    if (ps >= pageSize && (totalItems / (pageNumber * ps) < 1)) {
      setPageNumber(Math.ceil(totalItems / ps));
    }
    setPageSize(ps);
  }

  const pageSizes = [
    5, 10, 15, 30
  ]

  return (
    <div className="flex justify-between text-gray-400 py-4 items-center">
      <div className="font-semibold tracking-wider pb-1">
        {totalItems} {itemType}
      </div>
      <div className="flex items-center">
        {!isMinPage() && (
          <div><SquareIconButton Icon={ChevronLeftIcon} action={decrementPageNumber} className={!isMinPage() ? 'hover:text-gray-200' : ''} /></div>
        )}
        <div className={`pb-1 font-bold tracking-wide ${isMinPage() && 'pl-8'} ${isMaxPage() && 'pr-8'}`}>{pageNumber} of {Math.ceil(totalItems / pageSize)}</div>
        {!isMaxPage() && (
          <div><SquareIconButton Icon={ChevronRightIcon} action={incrementPageNumber} className={!isMaxPage() ? 'hover:text-gray-200' : ''} /></div>
        )}
      </div>
      <div className="flex items-center">
        {pageSizes.map((ps, i) => (
          <button
            className={`px-2 pb-1 font-semibold hover:text-gray-200 ${ps === pageSize ? 'text-gray-200' : 'text-gray-600'}`}
            onClick={() => updatePageSize(ps)}
            key={i}>
            {ps}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Paginator;