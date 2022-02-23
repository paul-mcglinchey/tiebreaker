import { CalendarIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { Fetch } from "../..";
import { useInterval, useUserFetch } from "../../../hooks";
import { IActivityLogProps } from "../../../models/props";
import { userfrontapi } from "../../../models/request-header.model";
import { parseTimeDifference, requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";

const ActivityLogEntry = ({ al }: IActivityLogProps) => {

  const [timeDifference, setTimeDifference] = useState<number | string>('');

  useInterval(() => {
    setTimeDifference(parseTimeDifference(al.updatedAt));
  }, 1000);

  return (
    <div className="flex px-2 items-center justify-between">
      <div className="flex py-2 space-x-2 items-center">
        <CheckCircleIcon className="w-5 text-green-500"/>
        <Fetch
          fetchOutput={useUserFetch(endpoints.user(al.actor), requestBuilder("GET", userfrontapi()), al.actor)}
          render={({ response }: any) => (
            <Fragment>
              <span className="px-2 py-1 text-sm tracking-wide bg-blue-500/10 rounded-lg">
                {response && response.username}
              </span>
            </Fragment>
          )}
        />
        <span className="text-sm text-gray-400">
          {al.task}
        </span>
      </div>
      <span className="flex space-x-2 text-xs items-center">
        <CalendarIcon className="w-3 h-3" />
        <div>
          {timeDifference && timeDifference} ago
        </div>
      </span>
    </div>
  )
}

export default ActivityLogEntry;