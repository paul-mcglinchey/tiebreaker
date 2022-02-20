import { Fragment } from "react";
import { useParams } from "react-router";
import { ClientHeader } from "..";
import { ClientOverview, Fetch } from "../..";
import { useFetch } from "../../../hooks";
import { requestBuilder } from "../../../services";
import { endpoints } from "../../../utilities";

const ClientPage = () => {

  const { clientId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}/${clientId}`, requestBuilder())}
      render={({ response, isLoading, errors }: any) => (
        <Fragment>
          {response && response.client && (
            <div className="flex flex-col">
              <ClientHeader client={response.client} />
              <ClientOverview client={response.client} />
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default ClientPage;