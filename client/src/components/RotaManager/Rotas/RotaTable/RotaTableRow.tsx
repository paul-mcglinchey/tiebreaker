import { UserAddIcon } from '@heroicons/react/solid';
import { IFetch, IRota, IUserResponse } from '../../../../models';
import { useFetch } from '../../../../hooks';
import { endpoints } from '../../../../utilities';
import { requestBuilder } from '../../../../services';
import { Fetch, InlineLink, TableRow, TableRowItem } from '../../../Common';

const RotaTableRow = ({ rota }: { rota: IRota }) => {

  return (
      <TableRow>
        <TableRowItem>
          <div className="text-sm font-medium text-white">{rota.name}</div>
        </TableRowItem>
        <TableRowItem>
          <Fetch
            fetchOutput={useFetch(endpoints.user(rota.createdBy || ""), requestBuilder("GET"))}
            render={({ response }: IFetch<IUserResponse>) => (
              <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
                {response && response.username}
              </span>
            )}
          />
        </TableRowItem>
        <TableRowItem>
          <div className="text-sm font-medium text-white">
            {(rota.employeeIds?.length || 0) > 0 ? (
              <InlineLink to={`/rotas/addemployee`} color="text-amber-400">
                <span className="self-center pt-0.5">Employees</span>
                <span className="text-lg">{rota.employeeIds?.length}</span>
              </InlineLink>
            ) : (
              <InlineLink to={`/rotas/addemployee`} color="text-blue-500">
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
          <div className="flex space-x-2 justify-end">
            <InlineLink to={`/rotas/${rota._id}/view`} color="text-gray-500">View</InlineLink>
          </div>
        </TableRowItem>
      </TableRow>
  )
}

export default RotaTableRow;