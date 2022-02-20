import { Fragment } from "react";
import { 
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
import { ClientOverview, Fetch } from "../..";
import { useFetch } from "../../../hooks";
import { IFetch } from "../../../models/fetch.model";
import { requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";

const ClientPage = () => {

  const { clientId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}/${clientId}`, requestBuilder())}
      render={({ response }: IFetch) => (
        <Fragment>
          {response && response.client && (
            <div className="flex flex-col">
              <ClientHeader client={response.client} />
              <ClientOverview client={response.client} />
              <Routes>
                <Route index element={<ViewClient />} />
                <Route path="view" element={<ViewClient />} />
                <Route path="edit" element={<EditClient />} />
                <Route path="addsession" element={<AddSession client={response.client} />} />
              </Routes>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default ClientPage;