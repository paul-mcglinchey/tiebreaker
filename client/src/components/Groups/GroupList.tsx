import { GroupCard } from '..';
import { IGroup, IGroupsProps } from '../../models';

const Groups = <TGroup extends IGroup>({ groups }: IGroupsProps<TGroup>) => {

  return (
    <div className="flex flex-wrap -m-2 mb-2">
      {groups.map((g: TGroup) => (
        <GroupCard g={g} key={g._id} />
      ))}
    </div>
  )
}

export default Groups;