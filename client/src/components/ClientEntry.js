import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from 'react';
import ClientSessions from "./ClientSessions";
import DeleteClient from "./DeleteClient";
import AddNewSession from "./AddNewSession";
import { makeDate } from "../helpers/dateParser";

const ClientEntry = (props) => {

  const { getClients, clientData, userGroup, addSessionOpen, toggleAddSession } = props;

  let sessions = clientData.sessions;

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);

  return (
    <Fragment>
      <div className="flex flex-col py-2 my-2 border-b-2 border-purple-brand space-y-2 filter drop-shadow-sm">
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <div className="flex items-end space-x-4">
              <span className="inline-block font-medium uppercase tracking-wider">
                {clientData.clientName.firstName} {clientData.clientName.lastName}
              </span>
              <span className="inline-block text-sm text-purple-brand font-medium uppercase tracking-wide">
                Joined: {makeDate(clientData.createdAt, '/')}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 self-center">
            <div className="flex px-3 border-2 rounded-xl border-transparent items-center font-extrabold text-green-500 hover:border-green-500 transition-all">
              <button onClick={() => toggleAddSession()} className="font-bold tracking-wide">
                Add session
              </button>
            </div>
            <div className="flex border-2 rounded-xl border-transparent hover:border-purple-brand text-purple-brand items-center transition-all">
              <button onClick={() => toggleExpansion()}>
                <ChevronDownIcon className={`h-8 w-8 transform transition-all hover:scale-110 duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="flex flex-col">
            <ClientSessions sessions={sessions} />
            <div className={`flex ${sessions.length === 0 ? 'justify-between' : 'justify-end'}`}>
              {clientData.sessions.length === 0 &&
                <div className="self-end italic px-1 text-gray-500 py-1">
                  No sessions for this client
                </div>
              }
              <DeleteClient clientId={clientData._id} userGroup={userGroup} setExpanded={() => setExpanded()} getClients={getClients} />
            </div>
          </div>
        )}
      </div>
      <AddNewSession clientData={clientData} addSessionOpen={addSessionOpen} toggleAddSession={() => toggleAddSession()} getClients={getClients} />
    </Fragment>
  )
}

export default ClientEntry;