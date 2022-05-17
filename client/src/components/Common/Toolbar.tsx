import { memo } from "react";
import { IToolbarProps } from "../../models";
import { ToolbarCreateButton } from ".";

const Toolbar = ({ children, title, createGroupAction, addRotaAction, addClientAction, addEmployeeAction }: IToolbarProps) => {
  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4">
        <h1 className="text-3xl font-bold tracking-wider text-color-header">{title}</h1>
        <div className="flex space-x-0 sm:space-x-4 items-center">
          {addClientAction && (
            <ToolbarCreateButton content='Add client' action={addClientAction} />
          )}
          {addEmployeeAction && (
            <ToolbarCreateButton content='Add employee' action={addEmployeeAction} />
          )}
          {addRotaAction && (
            <ToolbarCreateButton content='Add rota' action={addRotaAction} />
          )}
          {createGroupAction && (
            <ToolbarCreateButton content='Create group' action={createGroupAction} />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(Toolbar);