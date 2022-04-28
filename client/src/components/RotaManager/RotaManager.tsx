import { Outlet } from "react-router"
import { EmployeeProvider, rotaLinks, RotaProvider } from "../../utilities";
import { NavMenu } from "../Common";

const RotaManager = () => {
  return (
    <>
      <NavMenu links={rotaLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <RotaProvider>
          <EmployeeProvider>
            <Outlet />
          </EmployeeProvider>
        </RotaProvider>
      </div>
    </>
  )
}

export default RotaManager;