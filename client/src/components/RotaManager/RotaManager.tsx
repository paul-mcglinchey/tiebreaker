import { useState } from "react";
import { Outlet } from "react-router"
import { getItemInStorage } from "../../services";
import { ApplicationContext, rotaLinks } from "../../utilities";
import { NavMenu } from "../Common";

const RotaManager = () => {

  const [groupId, setGroupId] = useState<string>(getItemInStorage("groupId") || "");

  return (
    <ApplicationContext.Provider value={{ groupId: groupId, setGroupId: setGroupId }}>
      <NavMenu links={rotaLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </ApplicationContext.Provider>
  )
}

export default RotaManager;