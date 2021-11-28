import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import ClientSessions from "./ClientSessions";
import DeleteClient from "./DeleteClient";
import InfoPillBox from "./InfoPillBox";
import AddNewSession from "./AddNewSession";
import { makeDate } from "../helpers/dateParser";

const ClientEntry = (props) => {

  const { getClients } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);

  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  return (
    <Fragment>
      <div className="flex flex-col p-3 my-2 border-black border-2 rounded space-y-2 filter drop-shadow-sm">
        <div className="container flex justify-between">
          <div className="flex space-x-4 items-center">
            <div className="flex flex-col">
              <span className="inline-block font-bold uppercase text-gray-700">
                {props.clientData.clientName.firstName} {props.clientData.clientName.lastName}
              </span>
              <span className="inline-block text-sm text-purple-600 font-medium uppercase">
                Joined: {makeDate(props.clientData.createdAt, '/')}
              </span>
            </div>
            <div className="space-x-2 hidden md:block">
              <InfoPillBox data={props.clientData.sessions.length}>Sessions</InfoPillBox>
              <InfoPillBox data={makeDate(props.clientData.birthdate, '/')}>Birthday</InfoPillBox>
            </div>
          </div>
          <div className="flex space-x-2 self-center">
            <div className="flex px-3 border-2 rounded-xl border-green-500 items-center font-extrabold text-green-500 hover:bg-green-500 hover:text-white transition-all">
              <button onClick={() => toggleAddSession()} className="font-bold">
                Add session
              </button>
            </div>
            <div className="flex border-2 rounded-xl border-purple-500 hover:bg-purple-500 text-purple-500 hover:text-white items-center">
              <button onClick={() => toggleExpansion()}>
                <ChevronDownIcon className={`h-8 w-8 transform transition-all hover:scale-110 duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={expanded}
          enter="transition ease-in-out duration-500"
          enterFrom="transform opacity-0 scale-y-0"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in-out duration-500"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-0"
          className="origin-top"
        >
          <div className="flex flex-col">
            <ClientSessions clientData={props.clientData.sessions} />
            <div className="flex justify-between">
              {props.clientData.sessions.length === 0 &&
                <div className="self-end italic px-1 text-gray-500 py-1">
                  No sessions for this client
                </div>
              }
              <DeleteClient clientId={props.clientData._id} setExpanded={() => setExpanded()} getClients={getClients}/>
            </div>
          </div>
        </Transition>
      </div>
      <AddNewSession clientData={props.clientData} addSessionOpen={addSessionOpen} toggleAddSession={() => toggleAddSession()} />
    </Fragment>
  )
}

export default ClientEntry;