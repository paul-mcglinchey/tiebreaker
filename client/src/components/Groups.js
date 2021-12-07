import CreateGroup from "./CreateGroup"

const Groups = (props) => {

  const { getGroups } = props;

  return (
    <div className="">
      <CreateGroup getGroups={getGroups} />
    </div>
  )
}

export default Groups;