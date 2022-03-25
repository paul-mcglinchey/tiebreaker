import { useContext } from "react";
import { GroupCreateButton } from ".";
import { useFetch } from "../../../hooks";
import { IClientGroup, IFetch, IGroupsResponse } from "../../../models";
import { requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import { GroupInfoDisplay, GroupSelector } from "./Common";

const ClientGroupToolbar = () => {

  const { clientGroup, setClientGroup } = useContext(ApplicationContext);

  return (
    <div className="text-white">
      <Fetch
        fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder("GET"))}
        render={({ response, error }: IFetch<IGroupsResponse<IClientGroup>>) => (
          <>
            {response && !error && (
              <div className="flex md:space-x-4 justify-end">
                <div className="hidden md:flex space-x-4">
                  <GroupInfoDisplay groupCount={response.count} />
                  <GroupCreateButton href="/clients/creategroup" />
                </div>
                <GroupSelector groupType="client" group={clientGroup} setGroup={setClientGroup} groups={response.groups} />
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default ClientGroupToolbar;