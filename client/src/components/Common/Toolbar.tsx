import { GroupToolbar } from "..";
import { IChildrenProps } from "../../models";

const Toolbar = ({ children }: IChildrenProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{children}</span>
        <GroupToolbar />
      </div>
    </div>
  )
}

export default Toolbar;