import { memo, useEffect, useState } from 'react';
import { TableIcon } from '@heroicons/react/solid';
import { useRotaService } from '../../hooks';
import { IRota } from '../../models';
import { Modal, Prompter, SpinnerLoader, Table } from '../Common';
import { RotaForm, RotaTableRow } from '.';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Status", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {

  const { getCount, getRotas, isLoading, sortField, sortDirection, setSortField, setSortDirection } = useRotaService();

  const [addRotaOpen, setAddRotaOpen] = useState(false);

  useEffect(() => {
    setSortField(headers[1]!.value)
  }, [setSortField])

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
        {getCount() > 0 ? (
          <>
            <div className="flex flex-col flex-grow space-y-4">
              <Table
                isLoading={isLoading}
              >
                <Table.SortableHeader headers={headers} sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} />
                <Table.Body>
                  {getRotas().map((r: IRota, index: number) => (
                    <RotaTableRow rota={r} key={index} />
                  ))}
                </Table.Body>
              </Table>
            </div>
          </>
        ) : (
          isLoading ? (
            <SpinnerLoader />
          ) : (
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