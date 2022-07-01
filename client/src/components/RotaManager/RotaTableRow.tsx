import { useState } from 'react';
import { useRotaService, useUserService } from '../../hooks';
import { ButtonType, IRota } from '../../models';
import { Button, InlineLink, TableRow, TableRowItem } from '../Common';
import { RotaEmployeesModal } from '.';

const RotaTableRow = ({ rota }: { rota: IRota }) => {

  const [editRotaEmployeesOpen, setEditRotaEmployeesOpen] = useState(false)

  const { getUser } = useUserService()
  const { getRotaEmployees } = useRotaService()

  const employees = getRotaEmployees(rota)

  return (
    <TableRow>
      <TableRowItem>
        <div className="text-sm font-medium text-white">{rota.name}</div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>
            {new Date(rota.updatedAt || "").toLocaleDateString()}
          </span>
          <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
            {getUser(rota.audit?.createdBy)?.username || '--'}
          </span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="text-sm font-medium text-white">
          <Button
            type="button"
            buttonType={ButtonType.Tertiary}
            content={employees.length > 0 ? `${employees.length} employees` : 'Add employees'}
            action={() => setEditRotaEmployeesOpen(true)}
          />
          <RotaEmployeesModal rota={rota} isOpen={editRotaEmployeesOpen} close={() => setEditRotaEmployeesOpen(false)} />
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className={`px-3 py-1 bg-gray-800 rounded-xl text-xs uppercase tracking-wide font-semibold ${rota.locked ? "text-red-500" : "text-green-500"}`}>
          {rota.locked ? 'Locked' : 'Open'}
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex flex-grow space-x-2 justify-end">
          <InlineLink to={`/rotas/${rota._id}`} color="text-gray-500">View</InlineLink>
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default RotaTableRow;