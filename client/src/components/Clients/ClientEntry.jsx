import { Fragment, useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/solid";

import { ClientOptions, ClientSessions, AddNewSession, DeleteClient } from '.';

import { dateHelper } from "../../utilities";

const ClientEntry = (props) => {

  const {
    c,
    addSessionOpen,
    toggleAddSession,
    userGroup,
  } = props;

  let sessions = c.sessions;

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);

  const [clientDeletion, setClientDeletion] = useState(false);
  const toggleClientDeletion = () => setClientDeletion(!clientDeletion);

  return (
    <Fragment>
      <div className="flex flex-col py-2 mb-2 text-white border-b-2 border-blue-900 space-y-2">
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <div className="flex items-end space-x-4">
              <span className="inline-block font-medium tracking-wider">
                {c.clientName.firstName} {c.clientName.lastName}
              </span>
              <div className="hidden md:flex space-x-2">
                <span className="inline-block font-medium uppercase tracking-wider text-green-400">
                  {dateHelper.makeDate(c.birthdate, "/")}
                </span>
                {typeof c.contactInfo !== "undefined" && c.contactInfo.primaryPhoneNumber !== "undefined" &&
                  <span className="inline-block font-medium uppercase tracking-wider text-blue-400">
                    {c.contactInfo.primaryPhoneNumber}
                  </span>
                }
              </div>
            </div>
          </div>
          <div className="flex relative items-center">
            <ClientOptions />
            <div className="relative inline-block text-left">
              <button onClick={() => toggleExpansion()} className="inline-flex justify-center items-center w-full rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
                  Sessions
                  <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5 transform transition-all ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="flex flex-col">
            <ClientSessions sessions={sessions} />
            <div className={`flex ${sessions.length === 0 ? 'justify-between' : 'justify-end'}`}>
              {c.sessions.length === 0 &&
                <div className="self-end italic text-gray-500 py-1">
                  No sessions for this client
                </div>
              }
            </div>
          </div>
        )}
      </div>
      <AddNewSession c={c} addSessionOpen={addSessionOpen} toggleAddSession={() => toggleAddSession()} />
      {clientDeletion &&
        <DeleteClient
          toggleClientDeletion={toggleClientDeletion}
          clientId={c._id}
          userGroup={userGroup}
        />
      }
    </Fragment>
  )
}

export default ClientEntry;