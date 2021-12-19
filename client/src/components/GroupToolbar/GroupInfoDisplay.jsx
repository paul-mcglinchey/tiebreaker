import { UsersIcon } from "@heroicons/react/outline";

const GroupInfoDisplay = props => {

  const { groups } = props;

  return (
    <div className="flex items-center text-gray-400">
      <UsersIcon className="h-4 w-4" />
      <div>
        <span className="font-light align-baseline">
          <span className="font-medium">{groups.length}</span> groups
        </span>
      </div>
    </div>
  )
}

export default GroupInfoDisplay;