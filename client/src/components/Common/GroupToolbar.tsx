import { memo } from "react";
import { IToolbarProps } from "../../models";
import { Toolbar, GroupSelector } from ".";

interface IGroupToolbarProps extends IToolbarProps {
  showSelector?: boolean,
}

const GroupToolbar = ({
  title,
  addEmployeeAction,
  addClientAction,
  addRotaAction,
  createGroupAction,
  showSelector
}: IGroupToolbarProps) => {
  return (
    <Toolbar title={title} addRotaAction={addRotaAction} addClientAction={addClientAction} addEmployeeAction={addEmployeeAction} createGroupAction={createGroupAction}>
      <>
        {showSelector && (
          <GroupSelector />
        )}
      </>
    </Toolbar>
  )
}

export default memo(GroupToolbar);