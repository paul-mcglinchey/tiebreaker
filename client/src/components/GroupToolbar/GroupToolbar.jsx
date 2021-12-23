import { Fragment, useState } from 'react';
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { Fetch } from '..';
import { endpoints, requestHelper, sessionValidationSchema, useFetch, useMountEffect } from '../../utilities';

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
        <Fetch
          fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
          render={({ response, isLoading }) => (
            <Fragment>
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