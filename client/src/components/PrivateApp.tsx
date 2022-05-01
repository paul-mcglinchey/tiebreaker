import { Navigate, Route, Routes } from "react-router"
import { useAuth } from "../hooks"
import { IAuth } from "../models"
import { GroupProvider, UserProvider } from "../utilities"
import { AdminPanel } from "./AdminPanel"
import { ClientDashboard, ClientManager, ClientPage } from "./ClientManager"
import { Authenticate } from "./Common"
import { Dashboard } from "./Dashboard"
import { Groups } from "./Groups"
import { EmployeeDashboard, RotaDashboard, RotaManager, RotaPage } from "./RotaManager"


const PrivateApp = () => {
  return (
    <>
      <Authenticate
        authenticateOutput={useAuth(true)}
        render={({ getAccess, isLoading, isAdmin }: IAuth) => (
          <>
            <GroupProvider>
              {console.log(isAdmin())}
              <UserProvider>
                {!isLoading && (
                  getAccess() ? (
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={
                        <Dashboard />
                      } />
                      <Route path="/groups" element={
                        <Groups />
                      } />

                      {/* Client manager specific routes */}
                      <Route path="/clients/*" element={
                        <ClientManager />
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
                      <Route path="adminpanel" element={
                        isAdmin() ? (
                          <AdminPanel />
                        ) : (
                          <Navigate to="/" />
                        )
                      } />
                    </Routes>
                  ) : (
                    <Navigate to="/login" />
                  )
                )}
              </UserProvider>
            </GroupProvider>
          </>
        )}
      />
    </>
  )
}

export default PrivateApp