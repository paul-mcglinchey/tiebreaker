import { Fragment, useState } from 'react';
import { Fetch } from '../..';
import { RotaTable } from './RotaTable';
import { useFetch } from '../../../hooks';
import { endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IFetch } from '../../../models/fetch.model';
import RotaPrompter from './RotaPrompter';
import { IRotasResponse } from '../../../models/rotas-response.model';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Status", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.rotas(), requestBuilder(), [sortField, sortDirection]
      )}
      render={({ response, isLoading }: IFetch<IRotasResponse>) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {response && response.count > 0 ? (
              <Fragment>
                <div className="flex flex-col flex-grow space-y-4">
                  <RotaTable
                    rotas={response.rotas}
                    count={response.count}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    headers={headers}
                    isLoading={isLoading}
                  />
                </div>
              </Fragment>
            ) : (
              <RotaPrompter />
            )}
        </div>
      )
      }
    />
  )
}

export default RotaList;