import { NavMenu, SmartLink, Toolbar } from "../Common";
import { SystemListCollectionPanel, ApplicationPanel, PermissionPanel } from ".";
import { Navigate, Route, Routes } from "react-router";
import { IChildrenProps } from "../../models";
import { combineClassNames } from "../../services";
import { ApplicationProvider, PermissionProvider } from "../../contexts";

const AdminPanel = () => {
  return (
    <>
      <NavMenu />
      <div className="px-2 sm:px-6 lg:px-8 pb-10">
        <Toolbar title='Admin panel' />
        <div className="inline-flex space-x-2 mb-4">
          <TabLink to="lists">Lists</TabLink>
          <TabLink to="applications">Applications</TabLink>
          <TabLink to="permissions">Permissions</TabLink>
        </div>
        <Routes>
          <Route path="lists" element={<SystemListCollectionPanel />} />
          <Route path="applications" element={
            <ApplicationProvider>
              <ApplicationPanel />
            </ApplicationProvider>
          } />
          <Route path="permissions" element={
            <PermissionProvider>
              <PermissionPanel />
            </PermissionProvider>
          } />
          <Route path="/" element={<Navigate to="lists" />} />
        </Routes>
      </div>
    </>
  )
}

const TabLink = ({ to, children }: { to: string } & IChildrenProps) => {
  return (
    <SmartLink
      to={to}
      className={(match) => combineClassNames(
        match ? "border-blue-500" : "border-transparent", "py-1 px-2 text-xl transition-all border-b-2"
      )}
    >
      {children}
    </SmartLink>
  )
}

export default AdminPanel