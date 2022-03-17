import { useContext } from "react";
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";
import { useFetch } from "../../../hooks";
import { IClientGroup, IFetch, IGroupsResponse } from "../../../models";
import { requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch } from "../../Common";

const ClientGroupToolbar = () => {

  const { clientGroup, setClientGroup } = useContext(ApplicationContext);

  return (
    <>
      <div className="text-white">
        <Fetch
          fetchOutput={useFetch(endpoints.clientgroups, requestBuilder(), [clientGroup])}
          render={({ response }: IFetch<IGroupsResponse<IClientGroup>>) => (
            <>
              {response && (
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <GroupInfoDisplay groupCount={response.count} />
                    <GroupCreateButton href="/clients/creategroup" />
                  </div>
                  <GroupSelector
                    group={clientGroup}
                    setGroup={setClientGroup}
                    groups={response.groups}
                    storageKey="clientGroup"
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

export default ClientGroupToolbar;