import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { MouseEventHandler } from 'react';

interface IPageChangerProps {
  pageNumber: number,
  decreasePageNumber: () => MouseEventHandler,
  increasePageNumber: () => MouseEventHandler
}

const PageChanger = ({ pageNumber, decreasePageNumber, increasePageNumber }: IPageChangerProps) => {

  const iconStyles = "h-8 w-10";

  return (
    <div className="flex justify-end">
      <div className="hover:scale-110 transition-all">
        <button onClick={decreasePageNumber()}>
          <ChevronLeftIcon className={iconStyles} />
        </button>
      </div>
      <div>
        <div className="align-middle inline-block font-bold">
          {pageNumber + 1}
        </div>
      </div>
      <div className="hover:scale-110 transition-all">
        <button onClick={increasePageNumber()}>
          <ChevronRightIcon className={iconStyles} />
        </button>
      </div>
    </div>
  )
}

export default PageChanger;