import { Outlet } from "react-router"
import { clientLinks } from "../../utilities";
import { NavMenu } from "../Common";

const ClientManager = () => {
  return (
    <>
      <NavMenu links={clientLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  )
}

export default ClientManager;