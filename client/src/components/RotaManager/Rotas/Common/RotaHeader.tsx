import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { IRota } from "../../../../models";
import React, { useState } from "react";
import { DeleteModal, Dropdown } from "../../../Common";
import { IRotaService } from "../../../../services";

interface IRotaHeaderProps {
  rota: IRota,
  rotaService: IRotaService,
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const RotaHeader = ({ rota, rotaService, editing, setEditing }: IRotaHeaderProps) => {

  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);
  const toggleDeletionOpen = () => setDeletionOpen(!deletionOpen);

  const navigate = useNavigate();

  const deleteRota = () => {
    rotaService.deleteRota(rota);
    navigate('/rotas/dashboard', { replace: true });
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3 text-white text-2xl font-semibold tracking-wider">
        <Link to="/rotas/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 pb-1">Rotas</span>
        </Link>
        <span> / </span>
        <span className="text-green-500">
          {rota && rota.name && (
            <span>{rota.name}</span>
          )}
        </span>
        <span> / {editing ? 'Editing' : 'Viewing'}</span>
      </div>
      <div className="flex space-x-4 items-center">
        <Dropdown options={[ 
          editing 
          ? { label: 'View', action: () => setEditing(false), Icon: EyeIcon }
          : { label: 'Edit', action: () => setEditing(true), Icon: PencilIcon },
          { label: 'Delete', action: () => toggleDeletionOpen(), Icon: TrashIcon },
        ]}/>
      </div>
      <DeleteModal modalOpen={deletionOpen} toggleModalOpen={toggleDeletionOpen} deleteFunction={() => deleteRota()} />
    </div>
  )
}

export default RotaHeader;