import { Fragment } from 'react';
import { IFetch, IRotaProps, IUserResponse, userfrontapi } from '../../../../models';
import { useUserFetch } from '../../../../hooks';
import { endpoints } from '../../../../utilities';
import { requestBuilder } from '../../../../services';
import RowItem from './RowItem';
import { Fetch } from '../../../Common';
import { InlineLink } from '../../../ClientManager';
import { UserAddIcon } from '@heroicons/react/solid';

const RotaRow = ({ rota }: IRotaProps) => {

  return (
    <Fragment>
      <tr className="bg-gray-900 border-gray-700">
        <RowItem>
          <div className="flex items-center">
            <div className="">
              <div className="text-sm font-medium text-white">{rota.name}</div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center space-x-4 min-w-40">
            <Fetch
              fetchOutput={useUserFetch(endpoints.user(rota.createdBy || ""), requestBuilder("GET", userfrontapi()), rota.createdBy || "")}
              render={({ response }: IFetch<IUserResponse>) => (
                <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
                  {response && response.username}
                </span>
              )}
            />
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center">
            <div>
              <div className="text-sm font-medium text-white">
                {rota.employees?.length || (
                  <InlineLink to={`/rotas/addemployee`} color="text-blue-500">
                    <div className="whitespace-nowrap">Add employee</div>
                    <UserAddIcon className="w-6 h-6" />
                  </InlineLink>
                )}
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center">
            <div className="">
              <div className={`px-3 py-1 bg-gray-800 rounded-xl text-xs uppercase tracking-wide font-semibold ${rota.locked ? "text-red-500" : "text-green-500"}`}>
                {rota.locked ? 'Locked' : 'Open'}
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center space-x-2 justify-end">
            <InlineLink to={`/rotas/${rota._id}/view`} color="text-gray-500">View</InlineLink>
          </div>
        </RowItem>
      </tr>
    </Fragment>
  )
}

export default RotaRow;