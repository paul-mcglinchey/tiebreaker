import { useFetch } from "../../../hooks";
import { GroupType, IFetch, IGroup, IGroupsResponse } from "../../../models";
import { requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import { IToolbarProps } from "../models";
import Toolbar from "../Toolbar";
import GroupInfoDisplay from "./GroupInfoDisplay"
import GroupSelector from "./GroupSelector"

interface IGroupToolbarProps<TGroup> extends IToolbarProps {
  groupType: GroupType,
  showGroupInfo?: boolean,
  showSelector?: boolean,
  group?: TGroup,
  setGroup?: (group: TGroup) => void,
}

const GroupToolbar = <TGroup extends IGroup>({ title, createGroupAction, showSelector, showGroupInfo, groupType, group, setGroup }: IGroupToolbarProps<TGroup>) => {
  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(groupType).groups, requestBuilder("GET"))}
      render={({ response, error }: IFetch<IGroupsResponse<TGroup>>) => (
        <>
          {!error && response && (
            <Toolbar title={title} createGroupAction={createGroupAction}>
              <div className="flex md:space-x-4 justify-end">
                {showGroupInfo && (
                  <GroupInfoDisplay groupCount={response.count} />
                )}
                {showSelector && group && setGroup && (
                  <GroupSelector groupType="rota" group={group} setGroup={setGroup} groups={response.groups} />
                )}
              </div>
            </Toolbar>
          )}
        </>
      )}
    />
  )
}

export default GroupToolbar;