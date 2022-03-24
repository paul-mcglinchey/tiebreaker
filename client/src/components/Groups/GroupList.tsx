import { useEffect, useRef, useState } from 'react';
import { GroupCard } from '..';
import { IGroup, IGroupsProps } from '../../models';

const GroupList = <TGroup extends IGroup>({ groups, groupService }: IGroupsProps<TGroup>) => {

  const [defaultGroup, setDefaultGroup] = useState<string | undefined>(undefined);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    }
  }, []);

  useEffect(() => {
    const getDefaultGroup = async () => {
      await groupService.getDefaultGroup()
        .then(_id => setDefaultGroup(_id))
        .catch(err => console.error(err))
    }

    getDefaultGroup();
  })

  return (
    <div className="flex flex-wrap -m-2 mb-2">
      {groups.map((g: TGroup) => (
        <GroupCard g={g} groupService={groupService} isDefaultGroup={defaultGroup === g._id} key={g._id} />
      ))}
    </div>
  )
}

export default GroupList;