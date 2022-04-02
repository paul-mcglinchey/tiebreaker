import { Fragment, useContext } from "react";
import {
  Route,
  Routes, 
  useParams 
} from "react-router";
import { 
  RotaHeader
} from "..";
import { Fetch } from "../../..";
import { useFetch, useRefresh } from "../../../../hooks";
import { IFetch, IRotaResponse } from "../../../../models";
import { requestBuilder, RotaService, StatusService } from "../../../../services";
import { endpoints, StatusContext } from "../../../../utilities";
import { ViewRota } from "..";

const RotaPage = () => {

  const { status, setStatus } = useContext(StatusContext);

  const { rotaId } = useParams();
  const { dependency, refresh } = useRefresh();
  const rotaService = new RotaService(new StatusService(status, setStatus), refresh);

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.rota(rotaId)}`, requestBuilder(), [dependency])}
      render={({ response }: IFetch<IRotaResponse>) => (
        <Fragment>
          {response && response.rota && (
            <div className="flex flex-col">
              <RotaHeader rota={response.rota} rotaService={rotaService} />
              <Routes>
                <Route path="view" element={<ViewRota rota={response.rota} rotaService={rotaService} />} />
              </Routes>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default RotaPage;