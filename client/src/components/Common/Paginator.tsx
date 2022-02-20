import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { SquareIconButton } from ".";

const Paginator = ({ pageSize, pageNumber, setPageNumber, setPageSize, totalClients }) => {

  const isMinPage = () => pageNumber <= 1;
  const isMaxPage = () => pageNumber >= Math.ceil(totalClients / pageSize);

  const decrementPageNumber = () => {
    !isMinPage() && setPageNumber(pageNumber - 1);
  }

  const incrementPageNumber = () => {
    !isMaxPage() && setPageNumber(pageNumber + 1);
  }

  const updatePageSize = (ps) => {
    if (ps >= pageSize && (totalClients / (pageNumber * ps) < 1)) {
      setPageNumber(Math.ceil(totalClients / ps));
    }
    setPageSize(ps);
  }

  const pageSizes = [
    5, 10, 15, 30
  ]

  return (
    <div className="flex justify-between text-gray-400 py-4 items-center">
      <div className="font-semibold tracking-wider pb-1">
        {totalClients} clients
      </div>
      <div className="flex items-center">
        {!isMinPage() && (
          <div><SquareIconButton Icon={ChevronLeftIcon} action={decrementPageNumber} additionalClasses={!isMinPage() && 'hover:text-gray-200'} /></div>
        )}
        <div className={`pb-1 font-bold tracking-wide ${isMinPage() && 'pl-12'} ${isMaxPage() && 'pr-12'}`}>{pageNumber} of {Math.ceil(totalClients / pageSize)}</div>
        {!isMaxPage() && (
          <div><SquareIconButton Icon={ChevronRightIcon} action={incrementPageNumber} additionalClasses={!isMaxPage() && 'hover:text-gray-200'} /></div>
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