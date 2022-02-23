import { useContext } from "react";
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { Fetch } from '..';
import { useFetch } from "../../hooks";
import { IUserGroup } from "../../models";
import { IFetch } from "../../models/fetch.model";
import { requestBuilder } from "../../services";
import { ApplicationContext, endpoints } from "../../utilities";

const GroupToolbar = () => {

  const { userGroup, setUserGroup } = useContext(ApplicationContext); 

  const updateUserGroup = (group: IUserGroup) => {
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
          fetchOutput={useFetch(endpoints.groups, requestBuilder())}
          render={({ response }: IFetch) => (
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