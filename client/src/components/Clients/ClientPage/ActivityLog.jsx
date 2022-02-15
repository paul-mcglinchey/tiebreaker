const ActivityLog = ({ client }) => {

  const activityLog = { client };

  return (
    <div>
      {activityLog && activityLog.length > 0 ? (
        <div>
          {activityLog.map((al, i) => (
            <div>
              <span className="px-2 py-1 text-sm tracking-wide bg-blue-500/10 rounded-lg">
                {al.actor.name}
              </span>
              <span>
                {al.task}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div>No activity logged for this client yet...</div>
      )}
    </div>
  )
}

export default ActivityLog;