import { Fragment } from "react";
import { 
  Navigate,
  Route, 
  Routes, 
  useParams 
} from "react-router";
import { 
  AddSession, 
  ClientHeader, 
  EditClient, 
  ViewClient 
} from "..";
import { ClientOverview, Fetch } from "../../..";
import { useFetch } from "../../../../hooks";
import { IClientResponse, IFetch } from "../../../../models";
import { requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";

const ClientPage = () => {

  const { clientId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}/${clientId}`, requestBuilder(), [])}
      render={({ response }: IFetch<IClientResponse>) => (
        <Fragment>
          {response && response.client && (
            <div className="flex flex-col">
              <ClientHeader client={response.client} />
              <Routes>
                <Route path="overview" element={<ClientOverview client={response.client} />} />
                <Route path="view" element={<ViewClient />} />
                <Route path="edit" element={<EditClient />} />
                <Route path="addsession" element={<AddSession client={response.client} />} />
                <Route path="**" element={<Navigate to="overview" />} />
              </Routes>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default ClientPage;