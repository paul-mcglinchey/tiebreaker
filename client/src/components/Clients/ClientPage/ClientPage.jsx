import { Fragment } from "react";
import { Outlet, useParams } from "react-router"
import { OperationsTabs } from ".";
import { ClientHeader } from "..";
import { ClientOverview, Fetch } from "../..";
import { endpoints, requestHelper, useFetch } from "../../../utilities";

const ClientPage = () => {

  const { clientId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}/${clientId}`, requestHelper.requestBuilder("GET"), [])}
      render={({ response, isLoading, errors }) => (
        <Fragment>
          {response && response.client && (
            <div className="flex flex-col">
              <ClientHeader client={response.client} />
              <ClientOverview client={response.client} />
              <OperationsTabs />
              <Outlet />
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default ClientPage;