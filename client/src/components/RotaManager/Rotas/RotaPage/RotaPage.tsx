import { Fragment, useContext, useState } from "react";
import {
  useParams 
} from "react-router";
import { Fetch } from "../../..";
import { useFetch, useRefresh } from "../../../../hooks";
import { IFetch, IRotaResponse } from "../../../../models";
import { requestBuilder, RotaService, StatusService } from "../../../../services";
import { endpoints, StatusContext } from "../../../../utilities";
import { RotaHeader, Schedule } from "..";

const RotaPage = () => {

  const { status, setStatus } = useContext(StatusContext);

  const { rotaId } = useParams();
  const { dependency, refresh } = useRefresh();
  const rotaService = new RotaService(new StatusService(status, setStatus), refresh);
  
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.rota(rotaId || "")}`, requestBuilder(), [dependency])}
      render={({ response }: IFetch<IRotaResponse>) => (
        <Fragment>
          {response && response.rota && (
            <div className="flex flex-col">
              <RotaHeader rota={response.rota} rotaService={rotaService} editing={editing} setEditing={setEditing} />
              <Schedule rota={response.rota} rotaService={rotaService} editing={editing} />
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default RotaPage;