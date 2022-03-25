import { GroupCard } from '..';
import { IGroup, IGroupListProps } from '../../models';

const GroupList = <TGroup extends IGroup>({ groups, groupService }: IGroupListProps<TGroup>) => {

  return (
    <div className="flex flex-wrap -m-2 mb-2">
      {groups.map((g: TGroup) => (
        <GroupCard g={g} groupService={groupService} key={g._id} />
      ))}
    </div>
  )
}

export default GroupList;