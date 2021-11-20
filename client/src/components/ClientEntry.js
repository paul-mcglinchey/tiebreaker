import { ChevronDownIcon, XIcon, PlusIcon } from "@heroicons/react/solid";
import { Fragment, useState } from 'react';
import InfoPillBox from "./InfoPillBox";

const ClientEntry = (props) => {

  const makeDate = (isoDate) => {
    var date = new Date(isoDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);

  return (
    <Fragment>
      <div className="flex flex-col p-3 my-2 border-black border-2 rounded space-y-2 filter drop-shadow-sm">
        <div className="container flex justify-between">
          <div className="flex space-x-4 items-start">
            <div className="flex flex-col">
              <span className="inline-block font-bold uppercase text-gray-700">
                {props.clientData.clientname.firstName} {props.clientData.clientname.lastName}
              </span>
              <span className="inline-block text-sm text-purple-600 font-medium uppercase">
                Joined: {makeDate(props.clientData.createdAt)}
              </span>
            </div>
            <div className="space-x-2 hidden sm:block pt-1">
              <InfoPillBox data={props.clientData.sessions.length}>Sessions</InfoPillBox>
              <InfoPillBox data={makeDate(props.clientData.birthdate)}>Birthday</InfoPillBox>
            </div>
          </div>
          <div className="self-center">
            <div className="flex border-2 rounded-xl border-purple-500 bg-purple-500 items-center">
              <button onClick={() => toggleExpansion()}>
                <ChevronDownIcon className={`h-8 w-8 text-white transform transition-all hover:scale-110 duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
        {expanded &&
          <div className="flex space-x-2 justify-between">
            <div className="flex-grow border-2 border-purple-300 rounded-xl">
              <div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex border-2 rounded-xl border-green-500 bg-green-500 items-center transform transition-all hover:scale-110">
                <button>
                  <PlusIcon className="h-8 w-8 text-white" />
                </button>
              </div>
              <div className="flex border-2 rounded-xl border-red-500 bg-red-500 items-center transform transition-all hover:scale-110">
                <button>
                  <XIcon className="h-8 w-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </Fragment>
  )
}

export default ClientEntry;