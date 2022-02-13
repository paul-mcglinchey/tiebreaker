import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { endpoints, requestHelper } from "../../../utilities";
import { InlineButton } from "../ClientTable";

const DeleteClient = (props) => {

  const { client, groupName, isDeleteClientOpen, toggleDeleteClientOpen } = props;

  const deleteClient = () => {
    let body = { clientId: client._id, groupName: groupName };
    requestHelper.requestMaker(endpoints.clients, "DELETE", body);
    toggleDeleteClientOpen();
  }

  return (
    <Transition
      as={Fragment}
      show={isDeleteClientOpen}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div className="absolute w-full h-screen bg-black bg-opacity-70 top-0 left-0 text-gray-200">
        <div className="flex flex-col space-y-4 relative w-96 transform -translate-x-1/2 text-center bg-gray-900 rounded-lg p-4 top-1/3 left-1/2">
          <div className="font-semibold tracking-wider">
            Delete {client.fullName} from clients?
          </div>
          <div className="flex justify-center space-x-4">
            <InlineButton color="text-green-500" action={() => deleteClient()}>yes</InlineButton>
            <InlineButton color="text-red-500" action={() => toggleDeleteClientOpen()}>no</InlineButton>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default DeleteClient;