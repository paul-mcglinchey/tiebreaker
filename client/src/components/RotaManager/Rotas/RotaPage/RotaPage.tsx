import { Fragment, useState } from "react";
import {
  useParams 
} from "react-router";
import { Fetch } from "../../..";
import { useFetch, useRefresh, useStatus } from "../../../../hooks";
import { IFetch, IRotaResponse } from "../../../../models";
import { requestBuilder, RotaService } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { RotaHeader, Schedule } from "..";

const RotaPage = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const rotaService = new RotaService(statusService, refresh);

  const { rotaId } = useParams();
  
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.rota(rotaId || "")}`, requestBuilder(), [dependency], false)}
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