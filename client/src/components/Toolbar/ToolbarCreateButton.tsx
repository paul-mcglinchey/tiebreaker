import { PlusIcon } from '@heroicons/react/solid';

interface IToolbarCreateButtonProps {
  content?: string
  action: () => void
}

const ToolbarCreateButton = ({ content, action }: IToolbarCreateButtonProps) => {

  return (
    <button type="button" onClick={() => action()} className="flex items-center rounded-lg transition-all">
      <div className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-gray-800 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
        <span>{content || 'Create'}</span>
        <PlusIcon className="-mr-1 ml-2 h-5 w-5" />
      </div>
    </button>
  )
}

export default ToolbarCreateButton;