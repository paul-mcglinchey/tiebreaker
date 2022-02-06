import { UsersIcon } from "@heroicons/react/outline";

const GroupInfoDisplay = ({ groupCount }) => {

  return (
    <div className="hidden xl:flex items-center text-gray-400 space-x-1">
      <UsersIcon className="h-4 w-4" />
      <div>
        <span className="font-light align-baseline">
          <span className="font-medium">{groupCount}</span> group{groupCount > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default GroupInfoDisplay;