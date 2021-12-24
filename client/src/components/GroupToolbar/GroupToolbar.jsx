import { Fragment } from 'react';
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { Fetch } from '..';
import { endpoints, requestHelper, useFetch } from '../../utilities';

const GroupToolbar = ({ userGroup, setUserGroup, status }) => {

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
        <Fetch
          fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"), [status])}
          render={({ response, isLoading }) => (
            <Fragment>
              {console.log(status)}
              {response && response.groups && (
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <GroupInfoDisplay groupCount={response.groups.length} />
                    <GroupCreateButton />
                  </div>
                  <GroupSelector
                    userGroup={userGroup}
                    groups={response.groups}
                    updateUserGroup={updateUserGroup}
                    status={status}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </Fragment>
          )}
        />
      </div>
    </Fragment>
  )
}

export default GroupToolbar;