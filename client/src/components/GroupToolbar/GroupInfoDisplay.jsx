import { UsersIcon } from "@heroicons/react/outline";
import { Fetch } from "..";
import { endpoints, requestHelper, useFetch } from "../../utilities";

const GroupInfoDisplay = () => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestHelper.requestBuilder("GET"))}
      render={({ response }) => (
        <div className="hidden xl:flex items-center text-gray-400">
          <UsersIcon className="h-4 w-4" />
          <div>
            <span className="font-light align-baseline">
              <span className="font-medium">{response.count}</span> groups
            </span>
          </div>
        </div>
      )}
    />
  )
}

export default GroupInfoDisplay;