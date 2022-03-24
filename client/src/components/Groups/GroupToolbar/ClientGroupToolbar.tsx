import { UsersIcon } from "@heroicons/react/solid";
import { GroupCreateButton } from ".";
import { useFetch } from "../../../hooks";
import { IClientGroup, IFetch, IGroupsResponse } from "../../../models";
import { requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import ClientGroupSelector from "./ClientGroupSelector";

const ClientGroupToolbar = () => {

  return (
    <>
      <div className="text-white">
        <Fetch
          fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder())}
          render={({ response }: IFetch<IGroupsResponse<IClientGroup>>) => (
            <>
              {response && (
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <div className="hidden md:flex items-center text-gray-400 space-x-1">
                      <UsersIcon className="h-4 w-4" />
                      <div>
                        <span className="font-light align-baseline">
                          <span className="font-medium">{response.count}</span> group{response.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <GroupCreateButton href="/clients/creategroup" />
                  </div>
                  <ClientGroupSelector />
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