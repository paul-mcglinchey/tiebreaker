import { useContext } from "react";
import { GroupInfoDisplay, GroupCreateButton } from ".";
import { useFetch } from "../../../hooks";
import { IFetch, IGroupsResponse, IGroupToolbarProps, IRotaGroup } from "../../../models";
import { requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import { GroupSelector } from "./Common";

const RotaGroupToolbar = ({ showSelector }: IGroupToolbarProps) => {

  const { rotaGroup, setRotaGroup } = useContext(ApplicationContext);

  return (
    <div className="text-white">
      <Fetch
        fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder(), [rotaGroup])}
        render={({ response, error }: IFetch<IGroupsResponse<IRotaGroup>>) => (
          <>
            {!error && response && (
              <div className="flex md:space-x-4 justify-end">
                <div className="hidden md:flex space-x-4">
                  <GroupInfoDisplay groupCount={response.count} />
                  <GroupCreateButton href="/rotas/creategroup" />
                </div>
                {showSelector && (
                  <GroupSelector groupType="rota" group={rotaGroup} setGroup={setRotaGroup} groups={response.groups} />
                )}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default RotaGroupToolbar;