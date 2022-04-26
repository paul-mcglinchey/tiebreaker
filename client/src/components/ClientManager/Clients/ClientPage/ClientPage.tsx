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
import { useFetch, useGroupService, useRequestBuilder } from "../../../../hooks";
import { IClient, IFetch } from "../../../../models";
import { endpoints } from "../../../../utilities";

const ClientPage = () => {

  const { clientId } = useParams()
  const { groupId } = useGroupService()
  const { requestBuilder } = useRequestBuilder()

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.client(clientId || "", groupId), requestBuilder(), [])}
      render={({ response: client }: IFetch<IClient>) => (
        <Fragment>
          {client && (
            <div className="flex flex-col">
              <ClientHeader client={client} />
              <Routes>
                <Route path="overview" element={<ClientOverview client={client} />} />
                <Route path="view" element={<ViewClient />} />
                <Route path="edit" element={<EditClient />} />
                <Route path="addsession" element={<AddSession client={client} />} />
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