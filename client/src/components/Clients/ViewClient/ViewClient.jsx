import { useParams, Outlet } from "react-router";
import { ClientOverview, Fetch } from "../..";
import { endpoints, requestHelper, useFetch } from "../../../utilities";
import { ClientHeader } from "../Common";

const ViewClient = () => {

  const { clientId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}/${clientId}`, requestHelper.requestBuilder("GET"), [])}
      render={({ response, isLoading, errors }) => (
        <div className="flex flex-col">
          <ClientHeader client={response.client} />
          {response && response.client && (
            <ClientOverview client={response.client} />
          )}
          <Outlet />
        </div>
      )}
    />
  )
}

export default ViewClient;