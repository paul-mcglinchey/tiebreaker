import { useContext } from "react";
import { GroupToolbar, StatusBar, StatusHeader } from "..";
import { IChildrenProps } from "../../models";
import { ApplicationContext } from "../../utilities";

const Toolbar = ({ children }: IChildrenProps) => {

  const { status } = useContext(ApplicationContext);

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <StatusHeader>{children}</StatusHeader>
        <GroupToolbar />
      </div>
      <StatusBar status={status} />
    </div>
  )
}

export default Toolbar;