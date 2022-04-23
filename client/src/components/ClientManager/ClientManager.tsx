import { useState } from "react";
import { Outlet } from "react-router"
import { getItemInStorage } from "../../services";
import { ApplicationContext, clientLinks } from "../../utilities";
import { NavMenu } from "../Common";

const ClientManager = () => {

  const [groupId, setGroupId] = useState<string>(getItemInStorage("clientGroupId") || "");

  return (
    <ApplicationContext.Provider value={{ groupId: groupId, setGroupId: setGroupId }}>
      <NavMenu links={clientLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </ApplicationContext.Provider>
  )
}

export default ClientManager;