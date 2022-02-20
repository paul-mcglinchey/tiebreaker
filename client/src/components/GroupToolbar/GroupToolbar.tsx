import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { Fetch } from '..';
import { useFetch } from "../../hooks";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";

const GroupToolbar = ({ userGroup, setUserGroup, status }) => {

  const updateUserGroup = group => {
    sessionStorage.setItem(
      'userGroup',
      JSON.stringify(group)
    )
    setUserGroup(group);
  }

  return (

    <>
      <div className="text-white">
        <Fetch
          fetchOutput={useFetch(endpoints.groups, requestBuilder(), [status])}
          render={({ response, isLoading }) => (
            <>
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
            </>
          )}
        />
      </div>
    </>
  )
}

export default GroupToolbar;