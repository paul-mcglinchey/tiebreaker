import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SquareIconButton } from "../../..";
import { IClient } from "../../../../models";
import { ClientService, StatusService } from "../../../../services";
import { ApplicationContext, StatusContext } from "../../../../utilities";
import { DeleteDialog, Dropdown } from "../../../Common";

const ClientHeader = ({ client }: { client: IClient }) => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [deleteClientOpen, setDeleteClientOpen] = useState(false);
  const toggleDeleteClientOpen = () => setDeleteClientOpen(!deleteClientOpen);
  
  const { status, setStatus } = useContext(StatusContext);
  const clientService = new ClientService(new StatusService(status, setStatus));

  const { clientGroup } = useContext(ApplicationContext);

  const deleteClient = () => {
    clientService.deleteClient(client._id || "", clientGroup._id || "");
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
          <SquareIconButton Icon={ArrowLeftIcon} additionalClasses="h-5 w-5 transform hover:scale-105 transition-all" />
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
          { label: 'Delete', action: () => toggleDeleteClientOpen(), Icon: TrashIcon },
        ]} />
      </div>
      <DeleteDialog dialogOpen={deleteClientOpen} toggleDialogOpen={toggleDeleteClientOpen} itemType="client" deleteAction={() => deleteClient()} />
    </div>
  )
}

export default ClientHeader;