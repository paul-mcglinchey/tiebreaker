import CreateGroup from "./CreateGroup"

const Groups = (props) => {

  const { getGroups } = props;

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <CreateGroup getGroups={getGroups} />
    </div>
  )
}

export default Groups;