import { IToolbarProps, ToolbarType } from "../../models";
import { ClientGroupToolbar, RotaGroupToolbar } from "../Groups";
import { RotaToolbar } from "../RotaManager";

const Toolbar = ({ children, toolbarTypes }: IToolbarProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{children}</span>
        {toolbarTypes?.includes(ToolbarType.ClientGroups) && (
          <ClientGroupToolbar />
        )}
        {toolbarTypes?.includes(ToolbarType.RotaGroups) && (
          <RotaGroupToolbar />
        )}
        {toolbarTypes?.includes(ToolbarType.Rotas) && (
          <RotaToolbar />
        )}
      </div>
    </div>
  )
}

export default Toolbar;