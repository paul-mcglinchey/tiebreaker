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
          <div className="flex relative items-center">
            <ClientOptions />
            <div className="relative space-x-2 self-center">
              <div className="flex border-2 rounded-xl border-transparent text-gray-400 hover:text-purple-brand transition-all">
                <button className="flex items-center px-2 font-medium tracking-wide" onClick={() => toggleExpansion()}>
                  Sessions
                  <ChevronDownIcon className={`h-8 w-8 transition-all hover:scale-110 ${expanded ? "rotate-180" : ""}`} />
                </button>
              </div>
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