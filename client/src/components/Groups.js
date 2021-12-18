import { useMountEffect } from "../helpers/useMountEffect";
import CreateGroup from "./CreateGroup"
import GroupCard from "./GroupCard";

const Groups = (props) => {

  const { 
    groups, 
    setUserGroup,
    getGroups
  } = props;

  useMountEffect(getGroups);

  return (
    <div className="">
      {groups && groups.length > 0 ? (
        <div className="flex flex-wrap -m-2">
          {groups.map((g, i) => {
            return (
              <GroupCard 
                g={g}
                key={i}
                setUserGroup={setUserGroup}
              />
            )
          })}
        </div>
      ) : (
        <CreateGroup 
          getGroups={getGroups}
        />
      )}
    </div>
  )
}

export default Groups;