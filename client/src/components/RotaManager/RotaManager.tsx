import { Outlet } from "react-router"
import { rotaLinks } from "../../utilities";
import { NavMenu } from "../Common";

const RotaManager = () => {
  return (
    <>
      <NavMenu links={rotaLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  )
}

export default RotaManager;