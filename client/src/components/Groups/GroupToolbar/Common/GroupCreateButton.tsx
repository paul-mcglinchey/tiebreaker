import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/solid';
import { IProps } from '../../../../models';

const GroupCreateButton = ({ href }: IProps) => {

  return (
    <div className="flex items-center rounded-lg transition-all">
      <Link
        to={{ pathname: href }}
      >
        <div className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-gray-800 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
          <span>Create group</span>
          <PlusIcon className="-mr-1 ml-2 h-5 w-5" />
        </div>
      </Link>
    </div>
  )
}

export default GroupCreateButton;