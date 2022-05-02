import { Outlet } from "react-router"
import { useGroupService } from "../../hooks";
import { rotaLinks } from "../../config";
import { EmployeeProvider, RotaProvider } from "../../contexts";
import { NavMenu, SpinnerLoader } from "../Common";

const RotaManager = () => {

  const { isLoading, groupId } = useGroupService()

  return (
    <>
      <NavMenu links={rotaLinks} />
      <div className="px-2 sm:px-6 lg:px-8 text-gray-300">
        {isLoading || !groupId ? (
          <SpinnerLoader />
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