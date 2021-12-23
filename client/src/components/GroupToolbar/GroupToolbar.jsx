import { Fragment } from 'react';
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";

const GroupToolbar = ({ userGroup, setUserGroup }) => {

  const updateUserGroup = group => {
    sessionStorage.setItem(
      'userGroup',
      JSON.stringify(group)
    )
    setUserGroup(group);
  }

  return (

    <Fragment>
      <div className="text-white">
        <Fragment>
          <div className="flex md:space-x-4 justify-end">
            <div className="hidden md:flex space-x-4">
              <GroupInfoDisplay />
              <GroupCreateButton />
            </div>
            <GroupSelector
              userGroup={userGroup}
              updateUserGroup={updateUserGroup}
            />
          </div>
        </Fragment>
      </div>
    </Fragment>
  )
}

export default GroupToolbar;