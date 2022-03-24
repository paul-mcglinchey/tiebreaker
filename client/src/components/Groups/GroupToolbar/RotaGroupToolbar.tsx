import { useContext } from "react";
import { GroupInfoDisplay, GroupCreateButton } from ".";
import { useFetch } from "../../../hooks";
import { IFetch, IGroupsResponse, IRotaGroup } from "../../../models";
import { requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import RotaGroupSelector from "./RotaGroupSelector";

const RotaGroupToolbar = () => {

  const { rotaGroup } = useContext(ApplicationContext);

  return (
    <>
      <div className="text-white">
        <Fetch
          fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder(), [rotaGroup])}
          render={({ response }: IFetch<IGroupsResponse<IRotaGroup>>) => (
            <>
              {response && (
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <GroupInfoDisplay groupCount={response.count} />
                    <GroupCreateButton href="/rotas/creategroup" />
                  </div>
                  <RotaGroupSelector />
                </div>
              )}
            </>
          )}
        />
      </div>
    </>
  )
}

export default RotaGroupToolbar;