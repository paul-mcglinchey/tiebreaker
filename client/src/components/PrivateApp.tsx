import { Navigate, Route, Routes } from "react-router"
import { useAuthService } from "../hooks"
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
  AppLoader,
  RestrictedRoute
} from "."
import { GroupProvider, PermissionProvider, UserProvider } from "../contexts"
import { Application, Permission } from "../enums"

const PrivateApp = () => {

  const { isLoading, getAccess, isAdmin } = useAuthService()

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
                  <RestrictedRoute applicationIdentifier={Application.ClientManager} permission={Permission.ApplicationAccess} component={<ClientManager />} />
                }>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path=":clientId/*" element={<ClientPage />} />
                </Route>

                {/* Rota manager specific routes */}
                <Route path="/rotas/*" element={
                  <RestrictedRoute applicationIdentifier={Application.RotaManager} permission={Permission.ApplicationAccess} component={<RotaManager />} />
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