import { endpoints, requestHelper } from "../../utilities";

const DeleteClient = (props) => {

  const { clientId, userGroup, toggleClientDeletion } = props;

  const deleteClient = () => {
    let body = { clientId: clientId, groupname: userGroup };
    requestHelper.requestMaker(endpoints.clients, "DELETE", body);
    toggleClientDeletion();
  }

  return (
    <div className="absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-gray-900 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <span className="font-medium">
          Are you sure you want to delete this client?
        </span>
        <div className="flex justify-end space-x-2">
          <button onClick={() => deleteClient()} className="text-green-500 inline-block font-bold align-middle px-3 py-1 transition-all rounded-xl border-2 border-transparent hover:border-green-500">
            Yes
          </button>
          <button onClick={() => toggleClientDeletion()} className="text-red-500 inline-block font-bold align-middle px-3 py-1 transition-all rounded-xl border-2 border-transparent hover:border-red-500">
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteClient;