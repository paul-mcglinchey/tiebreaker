import { useEffect, useState } from "react";
import { Outlet } from "react-router"
import { Application, IProps } from "../../models";
import { getItemInStorage } from "../../services";
import { ApplicationContext } from "../../utilities";

const RotaManager = ({ setCurrentApplication }: IProps) => {

  const [groupId, setGroupId] = useState<string>(getItemInStorage("rotaGroupId") || "");

  useEffect(() => {
    let componentIsMounted = true;
    
    componentIsMounted && setCurrentApplication(Application.RotaManager);

    return () => {
      componentIsMounted = false;
    }
  })

  return (
    <ApplicationContext.Provider value={{ groupId: groupId, setGroupId: setGroupId  }}>
      <Outlet />
    </ApplicationContext.Provider>
  )
}

export default RotaManager;