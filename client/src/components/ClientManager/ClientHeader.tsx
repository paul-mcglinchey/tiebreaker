import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SquareIconButton, Dialog, Dropdown } from "..";
import { useClientService, useGroupService } from "../../hooks";
import { IClient } from "../../models";

const ClientHeader = ({ client }: { client: IClient }) => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [deleteClientOpen, setDeleteClientOpen] = useState(false);

  const { groupId } = useGroupService()
  const clientService = useClientService();

  const deleteClient = () => {
    clientService.deleteClient(client._id, groupId);
    navigate('/clients/dashboard', { replace: true });
  }

  const getRouteName = () => {
    switch (pathname.split('/').pop()) {
      case "addsession":
        return " / Add session";
      case "edit":
        return " / Edit";
      case "view":
        return " / View";
      default:
        return "";
    }
  }

  return (
    <div className="flex justify-between">
      <div className="inline-flex items-center space-x-2 text-white text-2xl font-semibold tracking-wider">
        <Link to="/clients/dashboard">
          <SquareIconButton Icon={ArrowLeftIcon} className="h-5 w-5 transform hover:scale-105 transition-all" />
        </Link>
        <Link to="/clients/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 py-1">Clients</span>
        </Link>
        <span> / </span>
        <span className="text-green-500">
          {client && client.name && (
            <span>{client.fullName}</span>
          )}
        </span>
        <span>{getRouteName()}</span>
      </div>
      <div>
        <Dropdown options={[
          { label: 'Delete', action: () => setDeleteClientOpen(true), Icon: TrashIcon },
        ]} />
      </div>
      <Dialog
        isOpen={deleteClientOpen}
        close={() => setDeleteClientOpen(false)}
        positiveActions={[() => deleteClient(), () => setDeleteClientOpen(false)]}
        title="Delete client"
        description="This action will delete the client from the current group"
        content="If you choose to continue you'll no longer have access to this client - all sessions belonging to the client will also become innaccessible."
      />
    </div>
  )
}

export default ClientHeader;