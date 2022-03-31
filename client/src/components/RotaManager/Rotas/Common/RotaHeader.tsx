import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import { SquareIconButton } from "../../..";
import { IRota } from "../../../../models";
import { RotaColourPicker } from ".";

const RotaHeader = ({ rota }: { rota: IRota}) => {

  const { pathname } = useLocation();

  const getRouteName = () => {
    switch (pathname.split('/').pop()) {
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
        <Link to="/rotas/dashboard">
          <SquareIconButton Icon={ArrowLeftIcon} additionalClasses="h-5 w-5 transform hover:scale-105 transition-all" />
        </Link>
        <Link to="/rotas/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 py-1">Rotas</span>
        </Link>
        <span> / </span>
        <span className="text-green-500">
          {rota && rota.name && (
            <span>{rota.name}</span>
          )}
        </span>
        <span>{getRouteName()}</span>
      </div>
      <div>
        <RotaColourPicker rota={rota} />
      </div>
    </div>
  )
}

export default RotaHeader;