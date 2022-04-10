import { useEffect, useState } from "react";
import { Outlet } from "react-router"
import { Application, IProps } from "../../models";
import { getItemInStorage } from "../../services";
import { ApplicationContext } from "../../utilities";

const ClientManager = ({ setCurrentApplication }: IProps) => {

  const [groupId, setGroupId] = useState<string>(getItemInStorage("clientGroupId") || "");

  useEffect(() => {
    setCurrentApplication(Application.ClientManager);
  }, [])

  return (
    <ApplicationContext.Provider value={{ groupId: groupId, setGroupId: setGroupId  }}>
      <Outlet />
    </ApplicationContext.Provider>
  )
}

export default ClientManager;