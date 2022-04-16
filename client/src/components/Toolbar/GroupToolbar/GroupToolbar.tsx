import { useSessionStorage } from "../../../hooks";
import { GroupType, IFetch, IGroup, IGroupsResponse } from "../../../models";
import { requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";
import { Fetch } from "../../Common";
import { IToolbarProps } from "../models";
import { Toolbar } from "..";
import { GroupSelector } from "."
import { Dispatch, SetStateAction } from "react";

interface IGroupToolbarProps extends IToolbarProps {
  groupType: GroupType,
  showSelector?: boolean,
  setGroupId?: Dispatch<SetStateAction<string>>,
}

const GroupToolbar = <TGroup extends IGroup>({
  title,
  addEmployeeAction,
  addClientAction,
  addRotaAction,
  createGroupAction,
  showSelector,
  groupType,
  setGroupId
}: IGroupToolbarProps) => {
  return (
    <Fetch
      fetchOutput={useSessionStorage(endpoints.groups(groupType).groups, requestBuilder("GET"), [], true)}
      render={({ response, error }: IFetch<IGroupsResponse<TGroup>>) => (
        <>
          {!error && response && (
            <Toolbar title={title} addRotaAction={addRotaAction} addClientAction={addClientAction} addEmployeeAction={addEmployeeAction} createGroupAction={createGroupAction}>
              <>
                {showSelector && setGroupId && (
                  <GroupSelector groupType={groupType} setGroupId={setGroupId} groups={response.groups} />
                )}
              </>
            </Toolbar>
          )}
        </>
      )}
    />
  )
}

export default GroupToolbar;