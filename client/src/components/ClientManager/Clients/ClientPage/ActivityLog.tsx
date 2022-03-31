import { ActivityLogEntry } from ".";
import { IClient } from "../../../../models";

const ActivityLog = ({ client }: { client: IClient }) => {

  const { activityLog } = client;

  return (
    <div>
      {activityLog && activityLog.length > 0 ? (
        <div>
          {activityLog.map((al, i) => (
            <ActivityLogEntry key={i} al={al} />
          ))}
        </div>
      ) : (
        <div>No activity logged for this client yet...</div>
      )}
    </div>
  )
}

export default ActivityLog;