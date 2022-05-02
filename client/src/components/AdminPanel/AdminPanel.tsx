import { memo } from "react";
import { NavMenu, Toolbar } from "../Common";
import { SystemListCollectionPanel, PermissionPanel } from ".";

const AdminPanel = () => {
  return (
    <>
      <NavMenu />
      <div className="px-2 sm:px-6 lg:px-8 text-gray-200 pb-10">
        <Toolbar title='Admin panel' />
        <div className="flex flex-col space-y-8">
          <SystemListCollectionPanel />
          <PermissionPanel />
        </div>
      </div>
    </>
  )
}

export default memo(AdminPanel);