import { memo, useState } from 'react';
import { Fetch, RotaForm } from '../..';
import { useFetch, useGroupService, useRequestBuilder, useRotaService } from '../../../hooks';
import { endpoints } from '../../../utilities';
import { IFetch, IRota, IRotasResponse } from '../../../models';
import { Modal, Prompter, Table } from '../../Common';
import { TableIcon } from '@heroicons/react/solid';
import { RotaTableRow } from './RotaTable';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Notification", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {

  const { groupId } = useGroupService()
  const { requestBuilder } = useRequestBuilder();

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [addRotaOpen, setAddRotaOpen] = useState(false);
  const toggleAddRotaOpen = () => setAddRotaOpen(!addRotaOpen);

  const { addRota, dependency } = useRotaService();

  return (
    <>
      <Fetch
        fetchOutput={useFetch(groupId && endpoints.rotas(groupId), requestBuilder(), [groupId, sortField, sortDirection, dependency])}
        render={({ response, isLoading }: IFetch<IRotasResponse>) => (
          <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {response && response.count > 0 ? (
              <>
                <div className="flex flex-col flex-grow space-y-4">
                  <Table
                    sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    headers={headers}
                    isLoading={isLoading}
                  >
                    <>
                      {response.rotas.map((r: IRota, index: number) => (
                        <RotaTableRow rota={r} key={index} />
                      ))}
                    </>
                  </Table>
                </div>
              </>
            ) : (
              !isLoading && (
                <Prompter title="Add a rota to get started" Icon={TableIcon} action={toggleAddRotaOpen} />
              )
            )}
          </div>
        )}
      />
      <Modal title="Add rota" modalOpen={addRotaOpen} toggleModalOpen={toggleAddRotaOpen}>
        <RotaForm handleSubmit={(values) => addRota(values, groupId)} />
      </Modal>
    </>
  )
}

export default memo(RotaList);