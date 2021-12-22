import { Fragment } from 'react';
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";

import { Fetch } from '..';

import { endpoints, requestHelper, useFetch } from '../../utilities'

const GroupToolbar = ({ userGroup, setUserGroup }) => {

  const updateUserGroup = group => {
    sessionStorage.setItem(
      'userGroup',
      JSON.stringify(group)
    )
    setUserGroup(group);
  }

  const setDefaultGroup = groups => {
    if (!userGroup) {
      updateUserGroup(groups.filter(g => g.default)[0]);
    }
  }

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response, isLoading }) => (
        <Fragment>
          <div className="text-white">
            {response && Array.isArray(response.groups) && (
              <Fragment>
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <GroupInfoDisplay groups={response.groups} />
                    <GroupCreateButton />
                  </div>
                  <GroupSelector
                    groups={response.groups}
                    userGroup={userGroup}
                    updateUserGroup={updateUserGroup}
                    setDefaultGroup={setDefaultGroup}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    />
  )
}

export default GroupToolbar;