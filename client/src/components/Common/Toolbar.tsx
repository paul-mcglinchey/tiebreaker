import { IToolbarProps, ToolbarType } from "../../models";
import { ClientGroupToolbar, RotaGroupToolbar } from "../Groups";

const Toolbar = ({ children, toolbarTypes, showSelector = true }: IToolbarProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{children}</span>
        {toolbarTypes?.includes(ToolbarType.ClientGroups) && (
          <ClientGroupToolbar showSelector={showSelector} />
        )}
        {toolbarTypes?.includes(ToolbarType.RotaGroups) && (
          <RotaGroupToolbar showSelector={showSelector} />
        )}
      </div>
    </div>
  )
}

export default Toolbar;