import { UserAddIcon } from '@heroicons/react/solid';
import { useUserService } from '../../../../hooks';
import { IRota } from '../../../../models';
import { InlineLink, TableRow, TableRowItem } from '../../../Common';

const RotaTableRow = ({ rota }: { rota: IRota }) => {

  const { getUser } = useUserService()

  return (
    <TableRow>
      <TableRowItem>
        <div className="text-sm font-medium text-white">{rota.name}</div>
      </TableRowItem>
      <TableRowItem>
        <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
          {getUser(rota.audit?.createdBy)?.username || '--'}
        </span>
      </TableRowItem>
      <TableRowItem>
        <div className="text-sm font-medium text-white">
          {(rota.employees?.length || 0) > 0 ? (
            <InlineLink to={`/rotas/employees`} color="text-amber-400">
              <span className="self-center pt-0.5">Employees</span>
              <span className="text-lg">{rota.employees?.length}</span>
            </InlineLink>
          ) : (
            <InlineLink to={`/rotas/employees/true`} color="text-blue-500">
              <div className="whitespace-nowrap">Add employee</div>
              <UserAddIcon className="w-6 h-6" />
            </InlineLink>
          )}
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className={`px-3 py-1 bg-gray-800 rounded-xl text-xs uppercase tracking-wide font-semibold ${rota.locked ? "text-red-500" : "text-green-500"}`}>
          {rota.locked ? 'Locked' : 'Open'}
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex flex-grow space-x-2 justify-end">
          <InlineLink to={`/rotas/${rota._id}/view`} color="text-gray-500">View</InlineLink>
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default RotaTableRow;