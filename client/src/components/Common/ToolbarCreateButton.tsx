import { PlusIcon } from '@heroicons/react/solid';
import { combineClassNames } from '../../services';

interface IToolbarCreateButtonProps {
  content?: string
  action: () => void
}

const ToolbarCreateButton = ({ content, action }: IToolbarCreateButtonProps) => {

  return (
    <div className="hidden md:block relative mt-1 text-gray-300">
      <button
        type="button"
        onClick={() => action()}
        className={combineClassNames(
          "h-10 w-full relative py-2 pl-3 pr-10 text-left",
          "bg-gray-800 rounded-lg shadow-md focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
          "focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
          "hover:bg-blue-500 hover:text-gray-900 transition-all"
        )}
      >
        <span className="block">{content || 'Create'}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <PlusIcon
            className="h-5 w-5 text-current"
            aria-hidden="true"
          />
        </span>
      </button>
    </div>
  )
}

export default ToolbarCreateButton;