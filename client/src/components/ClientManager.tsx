import { Outlet } from "react-router"
import { Application, IProps } from "../models"

const ClientManager = ({ setCurrentApplication }: IProps) => {

  setCurrentApplication(Application.ClientManager);

  return (
    <Outlet />
  )
}

export default ClientManager;