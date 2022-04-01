import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SquareIconButton } from "../../..";
import { IRota } from "../../../../models";
import { RotaColourPicker } from ".";
import { useContext, useState } from "react";
import { DeleteModal } from "../../../Common";
import { RotaService, StatusService } from "../../../../services";
import { StatusContext } from "../../../../utilities";

const RotaHeader = ({ rota }: { rota: IRota }) => {

  const { pathname } = useLocation();
  const { status, setStatus } = useContext(StatusContext);

  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);
  const toggleDeletionOpen = () => setDeletionOpen(!deletionOpen);

  const rotaService = new RotaService(new StatusService(status, setStatus));
  const navigate = useNavigate();

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

  const deleteRota = () => {
    rotaService.deleteRota(rota);
    navigate('/rotas/dashboard', { replace: true });
  }

  return (
    <div className="flex justify-between items-center">
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
      <div className="flex space-x-4 items-center">
        <SquareIconButton Icon={TrashIcon} colour="red-500" action={() => toggleDeletionOpen()} />
        <RotaColourPicker rota={rota} />
      </div>
      <DeleteModal modalOpen={deletionOpen} toggleModalOpen={toggleDeletionOpen} deleteFunction={() => deleteRota()} />
    </div>
  )
}

export default RotaHeader;