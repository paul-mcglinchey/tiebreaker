import { Outlet } from "react-router"
import { useGroupService } from "../../hooks";
import { EmployeeProvider, rotaLinks, RotaProvider } from "../../utilities";
import { NavMenu } from "../Common";

const RotaManager = () => {

  const { isLoading, groupId } = useGroupService()

  return (
    <>
      <NavMenu links={rotaLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        {isLoading || !groupId ? (
          <div>Loading...</div>
        ) : (
          <RotaProvider>
            <EmployeeProvider>
              <Outlet />
            </EmployeeProvider>
          </RotaProvider>
        )}
      </div>
    </>
  )
}

export default RotaManager;