import { Navigate, Route, Routes } from "react-router"
import { useAuth } from "../hooks"
import {
  AdminPanel,
  ClientDashboard,
  ClientManager,
  ClientPage,
  Dashboard,
  Groups,
  EmployeeDashboard,
  RotaDashboard,
  RotaManager,
  RotaPage,
  AppLoader
} from "."
import { GroupProvider, PermissionProvider, UserProvider } from "../contexts"
import { Permission } from "../enums"

interface IRestrictedRouteProps {
  applicationIdentifier: number
  permission: Permission
  component: JSX.Element
  redirect: string
}

const RestrictedRoute = ({ applicationIdentifier , permission, component, redirect }: IRestrictedRouteProps): JSX.Element => {
  const { user, hasPermission } = useAuth()

  return (user?._id && hasPermission(user._id, applicationIdentifier, permission)) ? component : <Navigate to={redirect} />
}

const PrivateApp = () => {

  const { isLoading, getAccess, isAdmin } = useAuth()

  return (
    <AppLoader>
      {!isLoading && (
        getAccess() ? (
          <GroupProvider>
            <UserProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={
                  <Dashboard />
                } />
                <Route path="/groups" element={
                  <PermissionProvider>
                    <Groups />
                  </PermissionProvider>
                } />

                {/* Client manager specific routes */}
                <Route path="/clients/*" element={
                  <RestrictedRoute applicationIdentifier={1} permission={Permission.ApplicationAccess} component={<ClientManager />} redirect="/" />
                }>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path=":clientId/*" element={<ClientPage />} />
                </Route>

                {/* Rota manager specific routes */}
                <Route path="/rotas/*" element={
                  <RotaManager />
                }>
                  <Route path="dashboard" element={<RotaDashboard />} />
                  <Route path=":rotaId/*" element={<RotaPage />} />
                  <Route path="employees" element={<EmployeeDashboard />} />
                  <Route path="employees/:isAddEmployeeOpen" element={<EmployeeDashboard />} />
                </Route>

                {/* Admin Routes */}
                <Route path="adminpanel/*" element={
                  isAdmin() ? <AdminPanel /> : <Navigate to="/" />
                } />
              </Routes>
            </UserProvider>
          </GroupProvider>
        ) : (
          <Navigate to="/login" />
        )
      )}
    </AppLoader>
  )
}

export default PrivateApp