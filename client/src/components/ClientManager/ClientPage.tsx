import {
  Navigate,
  Route,
  Routes,
  useParams
} from "react-router";
import { AddSession, ClientHeader, ClientOverview } from ".";
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
            <Route path="view" element={<ClientOverview client={client} />} />
            <Route path="addsession" element={<AddSession client={client} />} />
            <Route path="**" element={<Navigate to="view" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default ClientPage;