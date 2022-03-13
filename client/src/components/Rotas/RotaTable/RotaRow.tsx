import { RowItem } from '.';
import { Fragment } from 'react';
import { IRotaProps, userfrontapi } from '../../../models';
import { Fetch } from '../..';
import { useUserFetch } from '../../../hooks';
import { endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IFetch } from '../../../models/fetch.model';
import { InlineLink } from '../../Clients';

const RotaRow = ({ rota }: IRotaProps) => {

  return (
    <Fragment>
        <tr className="bg-gray-900 border-gray-700">
          <RowItem>
            <div className="flex items-center">
              <div className="">
                <div className="text-sm font-medium text-white">{new Date(rota.startDate).toLocaleDateString()}</div>
              </div>
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center">
              <div className="">
                <div className="text-sm font-medium text-white">{new Date(rota.endDate).toLocaleDateString()}</div>
              </div>
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-white">{rota.rotaType}</div>
              </div>
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center space-x-4 min-w-40">
              <span>
                {new Date(rota.createdAt).toLocaleDateString()}
              </span>
                <Fetch
                  fetchOutput={useUserFetch(endpoints.user(rota.createdBy || ""), requestBuilder("GET", userfrontapi()), rota.createdBy || "")}
                  render={({ response }: IFetch) => (
                    <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
                      {response && response.username}
                    </span>
                  )}
                />
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center space-x-2 justify-end">
              <InlineLink to={`/clients/${rota._id}/view`} color="text-gray-500">View</InlineLink>
            </div>
          </RowItem>
        </tr>
    </Fragment>
  )
}

export default RotaRow;