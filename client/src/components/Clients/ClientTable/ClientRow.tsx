import { RowItem } from '.';
import { ViewGridAddIcon } from '@heroicons/react/outline';
import InlineLink from '../Common/InlineLink';
import { Fragment } from 'react';
import { IClientProps, userfrontapi } from '../../../models';
import { Fetch } from '../..';
import { useUserFetch } from '../../../hooks';
import { endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IFetch } from '../../../models/fetch.model';

const ClientRow = ({ client }: IClientProps) => {

  return (
    <Fragment>
        <tr className="bg-gray-900 border-gray-700">
          <RowItem>
            <div className="flex items-center">
              <div className="">
                <div className="text-sm font-medium text-white">{client.clientName.firstName} {client.clientName.lastName}</div>
                <div className="text-sm">{client.contactInfo.primaryEmail}</div>
              </div>
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center space-x-4 min-w-40">
              <span>
                {new Date(client.updatedAt).toLocaleDateString()}
              </span>
                <Fetch
                  fetchOutput={useUserFetch(endpoints.user(client.updatedBy || ""), requestBuilder("GET", userfrontapi()), client.updatedBy || "")}
                  render={({ response }: IFetch) => (
                    <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
                      {response && response.username}
                    </span>
                  )}
                />
            </div>
          </RowItem>
          <RowItem>
            <div className="flex flex-grow items-center justify-start">
              {client.sessions.length > 0 ? (
                <InlineLink to={`/clients/${client._id}/addsession`} color="text-amber-400">
                  <span className="self-center pt-0.5">Sessions</span>
                  <span className="text-lg">{client.sessions.length}</span>
                </InlineLink>
              ) : (
                <InlineLink to={`/clients/${client._id}/addsession`} color="text-green-500">
                  <div className="whitespace-nowrap">Add session</div>
                  <ViewGridAddIcon className="w-6 h-6" />
                </InlineLink>
              )}
            </div>
          </RowItem>
          <RowItem>
            <div className="flex items-center space-x-2 justify-end">
              <InlineLink to={`/clients/${client._id}/overview`} color="text-gray-500">Overview</InlineLink>
              <InlineLink to={`/clients/${client._id}/view`} color="text-gray-500">View</InlineLink>
              <InlineLink to={`/clients/${client._id}/edit`} color="text-blue-500">Edit</InlineLink>
            </div>
          </RowItem>
        </tr>
    </Fragment>
  )
}

export default ClientRow;