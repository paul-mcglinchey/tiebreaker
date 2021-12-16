import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from 'react';
import ClientSessions from "./ClientSessions";
import DeleteClient from "./DeleteClient";
import AddNewSession from "./AddNewSession";

const ClientEntry = (props) => {

  const { getClients, clientData, addSessionOpen, toggleAddSession, userGroup } = props;

  let sessions = clientData.sessions;

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);

  const [optionsVisible, setOptionsVisible] = useState(false);
  const toggleOptionsVisible = () => setOptionsVisible(!optionsVisible);

  const [clientDeletion, setClientDeletion] = useState(false);
  const toggleClientDeletion = () => setClientDeletion(!clientDeletion);

  return (
    <Fragment>
      <div className="flex flex-col py-2 my-2 border-b-2 border-purple-brand space-y-2 filter drop-shadow-sm">
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <div className="flex items-end space-x-4">
              <span className="inline-block font-medium uppercase tracking-wider">
                {clientData.clientName.firstName} {clientData.clientName.lastName}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className={`font-medium tracking-wide ${optionsVisible ? 'text-white' : 'text-gray-400'} hover:text-white transition-all`}
              onClick={() => toggleOptionsVisible()}
            >
              Options
            </button>
            <div className="relative space-x-2 self-center">
              <div className="flex border-2 rounded-xl border-transparent text-gray-400 hover:text-purple-brand transition-all">
                <button className="flex items-center px-2 font-medium tracking-wide" onClick={() => toggleExpansion()}>
                  Sessions
                  <ChevronDownIcon className={`h-8 w-8 transform transition-all hover:scale-110 ${expanded ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {optionsVisible && (
          <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 px-0 sm:px-4  text-sm text-gray-400">
            <button
              onClick={() => toggleAddSession()}
              className="font-medium tracking-wide hover:text-white bg-gray-900 px-2 py-3 sm:py-1 rounded-lg"
            >
              Add session
            </button>
            <button
              onClick={() => toggleClientDeletion()}
              className="font-medium tracking-wide hover:text-white bg-gray-900 px-2 py-3 sm:py-1 rounded-lg"
            >
              Delete Client
            </button>
          </div>
        )}
        {expanded && (
          <div className="flex flex-col">
            <ClientSessions sessions={sessions} />
            <div className={`flex ${sessions.length === 0 ? 'justify-between' : 'justify-end'}`}>
              {clientData.sessions.length === 0 &&
                <div className="self-end italic px-6 text-gray-500 py-1">
                  No sessions for this client
                </div>
              }
            </div>
          </div>
        )}
      </div>
      <AddNewSession clientData={clientData} addSessionOpen={addSessionOpen} toggleAddSession={() => toggleAddSession()} getClients={getClients} />
      {clientDeletion &&
        <DeleteClient
          toggleClientDeletion={toggleClientDeletion}
          getClients={getClients}
          clientId={clientData.clientId}
          userGroup={userGroup}

        />
      }
    </Fragment>
  )
}

export default ClientEntry;