import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const PageChanger = (props) => {

  const iconStyles = "h-8 w-10";

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex items-middle">
          <div className="transform hover:scale-110 transition-all">
            <button onClick={props.decreasePageNumber()}>
              <ChevronLeftIcon className={iconStyles} />
            </button>
          </div>
          <div>
            <span className="align-middle inline-block font-bold">
              {props.pageNumber + 1}
            </span>
          </div>
          <div className="transform hover:scale-110 transition-all">
            <button onClick={props.increasePageNumber()}>
              <ChevronRightIcon className={iconStyles} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageChanger;