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
      {!confirming && (
        <div className="flex items-center self-end mt-4">
          <button onClick={() => confirmDeletion()} className="text-red-500 inline-block font-bold align-middle px-3 py-1 transition-all rounded-xl border-2 border-transparent hover:border-red-500 tracking-wide">
            Delete client
          </button>
        </div>
      )}
      {confirming && (
        <div className="flex items-center space-x-2 self-end mt-4 font-semibold tracking-wide">
          <span className="md:inline-block align-middle hidden">
            Are you sure you want to delete this client?
          </span>
          <button onClick={() => deleteClient(true)} className="text-green-500 inline-block font-bold align-middle px-3 py-1 transition-all rounded-xl border-2 border-transparent hover:border-green-500">
            Yes
          </button>
          <button onClick={() => deleteClient(false)} className="text-red-500 inline-block font-bold align-middle px-3 py-1 transition-all rounded-xl border-2 border-transparent hover:border-red-500">
            No
          </button>
        </div>
      )}
    </Fragment>
  )
}

export default DeleteClient;