import { Link, useLocation } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/solid';

const GroupCreateButton = props => {

  const location = useLocation();

  return (
    <div className="flex items-center rounded-lg transform hover:scale-105 transition-all">
      <Link
        to={{
          pathname: "/creategroup",
          state: { from: location }
        }}
      >
        <div className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
          <span>Create group</span>
          <PlusIcon className="-mr-1 ml-2 h-5 w-5" />
        </div>
      </Link>
    </div>
  )
}

export default GroupCreateButton;