import { useContext } from "react";
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { useFetch } from "../../../hooks";
import { IFetch, IGroupsResponse, IUserGroup } from "../../../models";
import { requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch } from "../../Common";

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
          fetchOutput={useFetch(endpoints.groups, requestBuilder(), [userGroup])}
          render={({ response }: IFetch<IGroupsResponse>) => (
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