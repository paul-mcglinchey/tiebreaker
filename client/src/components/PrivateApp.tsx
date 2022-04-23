import { Navigate, Route, Routes } from "react-router"
import { AdminPanel } from "./AdminPanel"
import { AddClient, ClientDashboard, ClientManager, ClientPage } from "./ClientManager"
import { Dashboard } from "./Dashboard"
import { ClientGroupDashboard, RotaGroupDashboard } from "./Groups"
import { Employees, RotaDashboard, RotaManager, RotaPage } from "./RotaManager"


const PrivateApp = () => {
    const AdminRoute = ({ children }: any) => {
        return children || <Navigate to="/" />
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={
                    <Dashboard />
                } />

                {/* Client manager specific routes */}
                <Route path="/clients/*" element={
                    <ClientManager />
                }>
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path=":clientId/*" element={<ClientPage />} />
                    <Route path="addclients" element={<AddClient />} />
                    <Route path="groups" element={<ClientGroupDashboard />} />
                </Route>

                {/* Rota manager specific routes */}
                <Route path="/rotas/*" element={
                    <RotaManager />
                }>
                    <Route path="dashboard" element={<RotaDashboard />} />
                    <Route path=":rotaId/*" element={<RotaPage />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/:isAddEmployeeOpen" element={<Employees />} />
                    <Route path="groups" element={<RotaGroupDashboard />} />
                </Route>

                {/* Admin Routes */}
                <Route path="adminpanel" element={
                    <AdminRoute>
                        <AdminPanel />
                    </AdminRoute>
                } />
            </Routes>
        </>
    )
}

export default PrivateApp