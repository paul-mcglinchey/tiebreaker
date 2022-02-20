import { useState } from "react";
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
      <div className="py-2 space-x-2">
        <Fetch 
          fetchOutput={useUserFetch(endpoints.user(al.actor), requestBuilder("GET", userfrontapi), al.actor)}
          render={({ response }: any) => (
            response.user.username
          )}
        />
        <span className="px-2 py-1 text-sm tracking-wide bg-blue-500/10 rounded-lg">
          
        </span>
        <span>
          {al.task}
        </span>
      </div>
      <span>
        {timeDifference && timeDifference}
      </span>
    </div>
  )
}

export default ActivityLogEntry;