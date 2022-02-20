import { ActivityLogEntry } from ".";
import { IClientProps } from "../../../models/props";

const ActivityLog = ({ client }: IClientProps) => {

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