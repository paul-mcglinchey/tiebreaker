import { Outlet } from "react-router"
import { Application, IProps } from "../models"

const RotaManager = ({ setCurrentApplication }: IProps) => {

  setCurrentApplication(Application.RotaManager);

  return (
    <Outlet />
  )
}

export default RotaManager;