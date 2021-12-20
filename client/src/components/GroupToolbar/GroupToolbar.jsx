import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";

const GroupToolbar = props => {

  const { userGroup, setUserGroup, groups } = props;

  return (
    <div className="flex space-x-4">
      <GroupInfoDisplay
        groups={groups}
      />
      <GroupCreateButton />
      <GroupSelector
        userGroup={userGroup}
        setUserGroup={setUserGroup}
        groups={groups}
      />
    </div>
  )
}

export default GroupToolbar;