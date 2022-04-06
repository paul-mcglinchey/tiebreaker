import { Fragment, useContext, useState } from 'react';
import { Fetch, RotaForm } from '../..';
import { RotaTable } from './RotaTable';
import { useFetch, useStatus } from '../../../hooks';
import { ApplicationContext, endpoints } from '../../../utilities';
import { requestBuilder, RotaService } from '../../../services';
import { IFetch } from '../../../models/fetch.model';
import RotaPrompter from './RotaPrompter';
import { IRotasResponse } from '../../../models/rotas-response.model';
import { Modal } from '../../Common';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Status", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {

  const { rotaGroup } = useContext(ApplicationContext);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [addRotaOpen, setAddRotaOpen] = useState(false);
  const toggleAddRotaOpen = () => setAddRotaOpen(!addRotaOpen);

  const { statusService } = useStatus();
  const rotaService = new RotaService(statusService);

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.rotas(rotaGroup._id || ""), requestBuilder(), [sortField, sortDirection])}
        render={({ response, isLoading }: IFetch<IRotasResponse>) => (
          <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {response && response.count > 0 ? (
              <Fragment>
                <div className="flex flex-col flex-grow space-y-4">
                  <RotaTable
                    rotas={response.rotas}
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
              <RotaPrompter action={toggleAddRotaOpen} />
            )}
          </div>
        )
        }
      />
      <Modal title="Add rota" modalOpen={addRotaOpen} toggleModalOpen={toggleAddRotaOpen}>
        <RotaForm handleSubmit={(values) => rotaService.addRota(values, rotaGroup)} />
      </Modal>
    </>
  )
}

export default RotaList;