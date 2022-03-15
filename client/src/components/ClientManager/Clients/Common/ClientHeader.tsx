import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import { ColourPicker } from ".";
import { SquareIconButton } from "../../..";
import { IClientProps } from "../../../../models";

const ClientHeader = ({ client }: IClientProps) => {

  const { pathname } = useLocation();

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
        <Link to="/dashboard">
          <SquareIconButton Icon={ArrowLeftIcon} additionalClasses="h-5 w-5 transform hover:scale-105 transition-all" />
        </Link>
        <Link to="/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 py-1">Clients</span>
        </Link>
        <span> / </span>
        <span className="text-green-500">
          {client && client.clientName && (
            <span>{client.fullName}</span>
          )}
        </span>
        <span>{getRouteName()}</span>
      </div>
      <ColourPicker client={client} />
    </div>
  )
}

export default ClientHeader;