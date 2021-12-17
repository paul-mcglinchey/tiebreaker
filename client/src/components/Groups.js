import CreateGroup from "./CreateGroup"

const Groups = (props) => {

  const { groups, getGroups } = props;

  return (
    <div className="">
      {groups && groups.length > 0 ? (
        <div className="flex space-x-4">
          {groups.map((g, i) => {
            return (
              <div className="flex-col flex-1 bg-purple-brand text-white px-6 pt-6 h-48 rounded-lg">
                <div className="flex flex-grow">
                  <h1 className="text-3xl font-extrabold">{g.groupname}</h1>
                </div>
                <div className="">
                  <span className="text-2xl font-bold">{g.clients.length}</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <CreateGroup getGroups={getGroups} />
      )}
    </div>
  )
}

export default Groups;