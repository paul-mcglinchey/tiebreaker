import { UsersIcon } from "@heroicons/react/outline";

const GroupInfoDisplay = ({ groupCount }) => {

  return (
    <div className="hidden xl:flex items-center text-gray-400">
      <UsersIcon className="h-4 w-4" />
      <div>
        <span className="font-light align-baseline">
          <span className="font-medium">{groupCount}</span> groups
        </span>
      </div>
    </div>
  )
}

export default GroupInfoDisplay;