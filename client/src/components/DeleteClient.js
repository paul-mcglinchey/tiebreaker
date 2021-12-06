import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';

const DeleteClient = (props) => {

  const { getClients, clientId, userGroup, setExpanded } = props;

  const [confirming, setConfirming] = useState(false);

  const confirmDeletion = () => {
    setConfirming(true);
  }

  const deleteClient = (confirmed) => {

    if (confirmed) {
      fetch((endpoints.deleteclient), {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        },
        body: JSON.stringify({ clientId: clientId, groupname: userGroup })
      })
        .then(() => {
          setExpanded(false);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setConfirming(false);
    }

    getClients();

  }

  return (
    <Fragment>
      <Transition
        show={!confirming}
        enter="transition-all duration-150"
        enterFrom="transform scale-x-0 opacity-0"
        enterTo="transform scale-x-100 opacity-100"
        leave="transition-all duration-100"
        leaveFrom="transform scale-x-100 opacity-100"
        leaveTo="transform scale-x-0 opacity-0"
        className="flex justify-end origin-left"
      >
        <div className="flex items-center self-end mt-4">
          <button onClick={() => confirmDeletion()} className="bg-white text-red-500 hover:bg-red-500 hover:text-white inline-block font-bold align-middle px-3 py-1 transition-all border-2 border-red-500 rounded-xl">
            Delete client
          </button>
        </div>
      </Transition>
      <Transition
        show={confirming}
        enter="transition-all duration-100"
        enterFrom="transform scale-x-0 opacity-0"
        enterTo="transform scale-x-100 opacity-100"
        leave="transition-all duration-100"
        leaveFrom="transform scale-x-100 opacity-100"
        leaveTo="transform scale-x-0 opacity-0"
        className="flex justify-end origin-right"
      >
        <div className="flex items-center space-x-2 self-end mt-4">
          <span className="md:inline-block align-middle font-bold hidden">
            Are you sure you want to delete this client?
          </span>
          <button onClick={() => deleteClient(true)} className="bg-green-500 text-white hover:bg-white hover:text-green-500 inline-block font-bold align-middle px-3 py-1 transition-all border-2 border-green-500 rounded-xl">
            Yes
          </button>
          <button onClick={() => deleteClient(false)} className="bg-red-500 text-white hover:bg-white hover:text-red-500 inline-block font-bold align-middle px-3 py-1 transition-all border-2 border-red-500 rounded-xl">
            No
          </button>
        </div>
      </Transition>
    </Fragment>
  )
}

export default DeleteClient;