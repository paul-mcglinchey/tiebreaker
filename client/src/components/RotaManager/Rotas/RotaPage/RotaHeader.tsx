import { ChevronLeftIcon, EyeIcon, LockClosedIcon, LockOpenIcon, PencilIcon, TrashIcon, UsersIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { ButtonType, IRota } from "../../../../models";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, DeleteDialog, Dropdown } from "../../../Common";
import { EditRotaModal } from "..";
import { useGroupService, useRotaService } from "../../../../hooks";
import { useFormikContext } from "formik";

interface IRotaHeaderProps {
  rota: IRota,
  editing: boolean,
  setEditing: Dispatch<SetStateAction<boolean>>
}

const RotaHeader = ({ rota, editing, setEditing }: IRotaHeaderProps) => {

  const { groupId } = useGroupService()
  const { updateRota, deleteRota } = useRotaService()
  const { handleSubmit, dirty } = useFormikContext()

  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);
  const toggleDeletionOpen = () => setDeletionOpen(!deletionOpen);

  const [editRotaOpen, setEditRotaOpen] = useState<boolean>(false);
  const toggleEditRotaOpen = () => setEditRotaOpen(!editRotaOpen);

  const updateEditingStatus = () => {
    dirty && handleSubmit();
    setEditing(!editing);
  }

  const updateLockedStatus = () => {
    updateRota({ locked: !rota?.locked }, rota?._id, groupId);
  }

  return (
    <div className="flex justify-between items-center text-gray-200">
      <Link to="/rotas/dashboard" className="flex sm:hidden p-1 rounded-lg">
        <ChevronLeftIcon className="w-8 h-8 transform hover:scale-105" />
      </Link>
      <div className="hidden sm:flex items-center pb-0.5 space-x-3 text-white text-base md:text-2xl font-semibold tracking-wider">
        <Link to="/rotas/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 pb-1">Rotas</span>
        </Link>
        <span> / </span>
        <span className="text-green-500">
          <span>{rota.name}</span>
        </span>
        <span> / {editing ? 'Editing' : 'Viewing'}</span>
      </div>
      <div className="flex space-x-4 items-center">
        {!rota.locked ? (
          <Button buttonType={ButtonType.Tertiary} content={editing ? 'View' : 'Edit'} Icon={editing ? EyeIcon : PencilIcon} action={() => updateEditingStatus()} />
        ) : (
          <LockClosedIcon className="text-gray-400 w-6 h-6" />
        )}
        <Dropdown options={[
          { label: 'Edit Rota Details', action: () => toggleEditRotaOpen(), Icon: PencilIcon },
          { label: 'Modify Employees', action: () => { }, Icon: UsersIcon },
          { label: rota.locked ? 'Unlock rota' : 'Lock rota', action: () => updateLockedStatus(), Icon: rota.locked ? LockOpenIcon : LockClosedIcon },
          { label: 'Delete', action: () => toggleDeletionOpen(), Icon: TrashIcon },
        ]} />
      </div>
      <EditRotaModal modalOpen={editRotaOpen} toggleModalOpen={toggleEditRotaOpen} rota={rota} />
      <DeleteDialog dialogOpen={deletionOpen} toggleDialogOpen={toggleDeletionOpen} itemType="rota" deleteAction={() => deleteRota(rota._id, groupId)} />
    </div>
  )
}

export default RotaHeader;