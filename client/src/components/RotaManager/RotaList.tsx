import { useEffect, useState } from 'react';
import { TableIcon } from '@heroicons/react/solid';
import { useAuthService, useRotaService } from '../../hooks';
import { IRota } from '../../models';
import { Prompter, SpinnerLoader, Table } from '../Common';
import { RotaModal, RotaTableRow } from '.';
import { Application, Permission } from '../../enums';

const headers = [
  { name: "Rota name", value: "name", interactive: true },
  { name: "Created by", value: "createdBy", interactive: true },
  { name: "Employees", value: "employees", interactive: true },
  { name: "Status", value: "locked", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const RotaList = () => {
  
  const [addRotaOpen, setAddRotaOpen] = useState(false);
  
  const { rotas, isLoading, sortField, sortDirection, setSortField, setSortDirection } = useRotaService();
  const { hasPermission } = useAuthService()

  useEffect(() => {
    setSortField(headers[1]!.value)
  }, [setSortField])

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
        {rotas.length > 0 ? (
          <>
            <div className="flex flex-col flex-grow space-y-4">
              <Table
                isLoading={isLoading}
              >
                <Table.SortableHeader headers={headers} sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} />
                <Table.Body>
                  {rotas.map((r: IRota, index: number) => (
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
            hasPermission(Application.RotaManager, Permission.AddEditDeleteRotas) ? (
              <Prompter title="Add a rota to get started" Icon={TableIcon} action={() => setAddRotaOpen(true)} />
            ) : (
              <Prompter title="There are no rotas added to this group yet" />
            )
          )
        )}
      </div>
      <RotaModal isOpen={addRotaOpen} close={() => setAddRotaOpen(false)} />
    </>
  )
}

export default RotaList