import { useEffect } from "react";
import { Outlet } from "react-router"
import { Application, IProps } from "../../models";

const RotaManager = ({ setCurrentApplication }: IProps) => {

  useEffect(() => {
    let componentIsMounted = true;
    
    componentIsMounted && setCurrentApplication(Application.RotaManager);

    return () => {
      componentIsMounted = false;
    }
  })

  return (
    <Outlet />
  )
}

export default RotaManager;