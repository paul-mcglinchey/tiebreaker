import {
  Navigate,
  Route,
  Routes,
  useParams
} from "react-router";
import { AddSession, ClientHeader, ViewClient, ClientOverview } from ".";
import { useClientService } from "../../hooks";

const ClientPage = () => {

  const { clientId } = useParams()
  const { getClient } = useClientService()

  const client = getClient(clientId)

  return (
    <>
      {client && (
        <div className="flex flex-col">
          <ClientHeader client={client} />
          <Routes>
            <Route path="overview" element={<ClientOverview client={client} />} />
            <Route path="view" element={<ViewClient />} />
            <Route path="addsession" element={<AddSession client={client} />} />
            <Route path="**" element={<Navigate to="overview" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default ClientPage;