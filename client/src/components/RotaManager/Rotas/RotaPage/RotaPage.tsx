import { Fragment } from "react";
import {
  Route,
  Routes, 
  useParams 
} from "react-router";
import { 
  RotaHeader
} from "..";
import { Fetch } from "../../..";
import { useFetch } from "../../../../hooks";
import { IFetch, IRotaResponse } from "../../../../models";
import { requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { ViewRota } from "..";

const RotaPage = () => {

  const { rotaId } = useParams();

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.rotas(rotaId)}`, requestBuilder(), [])}
      render={({ response }: IFetch<IRotaResponse>) => (
        <Fragment>
          {response && response.rota && (
            <div className="flex flex-col">
              <RotaHeader rota={response.rota} />
              <Routes>
                <Route path="view" element={<ViewRota rota={response.rota} />} />
              </Routes>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default RotaPage;