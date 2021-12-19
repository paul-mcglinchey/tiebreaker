import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useMountEffect } from '../helpers/useMountEffect';
import GroupCard from "./GroupCard";

const Groups = (props) => {

  const {
    groups,
    setUserGroup,
    update
  } = props;

  const location = useLocation();

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
        <Navigate to="/creategroup" state={{ from: location }} />
      )}
    </div>
  )
}

export default Groups;