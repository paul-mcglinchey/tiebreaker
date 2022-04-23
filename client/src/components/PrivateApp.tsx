import { Navigate, Route, Routes } from "react-router"
import { useAuth } from "../hooks"
import { IAuth } from "../models"
import { AdminPanel } from "./AdminPanel"
import { ClientDashboard, ClientManager, ClientPage } from "./ClientManager"
import { Authenticate } from "./Common"
import { Dashboard } from "./Dashboard"
import { Groups } from "./Groups"
import { Employees, RotaDashboard, RotaManager, RotaPage } from "./RotaManager"


const PrivateApp = () => {
  const AdminRoute = ({ children }: any) => {
    return children || <Navigate to="/" />
  }

  return (
    <>
      <Authenticate
        authenticateOutput={useAuth(true)}
        render={({ getAccess, isLoading }: IAuth) => (
          <>
            {!isLoading && (
              getAccess() ? (
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={
                    <Dashboard />
                  }/>
                  <Route path="/groups" element={
                    <Groups />
                  }/>

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
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/:isAddEmployeeOpen" element={<Employees />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="adminpanel" element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  } />
                </Routes>
              ) : (
                <Navigate to="/login" />
              )
            )}
          </>
        )}
      />
    </>
  )
}

export default PrivateApp