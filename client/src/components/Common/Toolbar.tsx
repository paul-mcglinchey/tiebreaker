import { GroupToolbar, StatusHeader } from "..";
import { IChildrenProps } from "../../models";

const Toolbar = ({ children }: IChildrenProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <StatusHeader>{children}</StatusHeader>
        <GroupToolbar />
      </div>
    </div>
  )
}

export default Toolbar;