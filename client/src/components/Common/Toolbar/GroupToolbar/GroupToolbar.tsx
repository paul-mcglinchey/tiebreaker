import { useRequestBuilder, useSessionStorage } from "../../../../hooks";
import { IFetch, IGroupsResponse, IToolbarProps } from "../../../../models";
import { endpoints } from "../../../../utilities";
import { Fetch } from "../../../Common";
import { Toolbar, GroupSelector } from "../..";
import { Dispatch, SetStateAction } from "react";

interface IGroupToolbarProps extends IToolbarProps {
  showSelector?: boolean,
  setGroupId?: Dispatch<SetStateAction<string>>,
}

const GroupToolbar = ({
  title,
  addEmployeeAction,
  addClientAction,
  addRotaAction,
  createGroupAction,
  showSelector,
  setGroupId
}: IGroupToolbarProps) => {

  const { requestBuilder } = useRequestBuilder()

  return (
    <Fetch
      fetchOutput={useSessionStorage(endpoints.groups, requestBuilder(), [], true)}
      render={({ response, error }: IFetch<IGroupsResponse>) => (
        <>
          {!error && response && (
            <Toolbar title={title} addRotaAction={addRotaAction} addClientAction={addClientAction} addEmployeeAction={addEmployeeAction} createGroupAction={createGroupAction}>
              <>
                {showSelector && setGroupId && (
                  <GroupSelector setGroupId={setGroupId} groups={response.groups} />
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