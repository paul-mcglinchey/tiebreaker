import { GroupToolbar } from "..";
import { IToolbarProps, ToolbarType } from "../../models";
import { RotaToolbar } from "../RotaToolbar";

const Toolbar = ({ children, toolbarType }: IToolbarProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{children}</span>
        {toolbarType === ToolbarType.Groups && (
          <GroupToolbar />
        )}
        {toolbarType === ToolbarType.Rotas && (
          <RotaToolbar />
        )}
      </div>
    </div>
  )
}

export default Toolbar;