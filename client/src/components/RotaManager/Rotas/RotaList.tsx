import { memo, useEffect, useState } from 'react';
import { useRotaService } from '../../../hooks';
import { IRota } from '../../../models';
import { Modal, Prompter, Table } from '../../Common';
import { TableIcon } from '@heroicons/react/solid';
import { RotaForm, RotaTableRow } from '..';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Status", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {

  const { getCount, getRotas, isLoading, sortField, updateSortField, sortDirection, updateSortDirection } = useRotaService();

  const [addRotaOpen, setAddRotaOpen] = useState(false);

  useEffect(() => {
    updateSortField(headers[1]!.value)
  }, [updateSortField])

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
        {getCount() > 0 ? (
          <>
            <div className="flex flex-col flex-grow space-y-4">
              <Table
                sortField={sortField}
                setSortField={updateSortField}
                sortDirection={sortDirection}
                setSortDirection={updateSortDirection}
                headers={headers}
                isLoading={isLoading}
              >
                <>
                  {getRotas().map((r: IRota, index: number) => (
                    <RotaTableRow rota={r} key={index} />
                  ))}
                </>
              </Table>
            </div>
          </>
        ) : (
          !isLoading && (
            <Prompter title="Add a rota to get started" Icon={TableIcon} action={() => setAddRotaOpen(false)} />
          )
        )}
      </div>
      <Modal title="Add rota" description="You can use this dialog to create a new rota" isOpen={addRotaOpen} close={() => setAddRotaOpen(false)}>
        <RotaForm />
      </Modal>
    </>
  )
}

export default memo(RotaList);