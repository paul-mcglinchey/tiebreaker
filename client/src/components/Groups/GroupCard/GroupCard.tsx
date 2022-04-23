import { useState } from 'react';
import { TrashIcon, DotsVerticalIcon, PencilIcon } from '@heroicons/react/solid';
import { SquareIconButton } from '../..';
import { IGroup, IGroupService } from '../../../models';
import { DeleteDialog } from '../../Common';
import { EditGroupModal } from '..';

interface IGroupProps {
  g: IGroup,
  groupService: IGroupService,
  render: (isCardFlipped: boolean) => JSX.Element
}

const GroupCard = ({ g, groupService, render }: IGroupProps) => {

  const [cardFlipped, setCardFlipped] = useState(false);
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);
  const toggleEditGroupOpen = () => setEditGroupOpen(!editGroupOpen);
  const toggleDeleteGroupOpen = () => setDeleteGroupOpen(!deleteGroupOpen);

  return (
    <>
      <div className={`flex flex-auto min-w-120 flex-col relative h-48 mx-2 my-4 transform hover:scale-100-1/2 transition-all`}>
        <div style={{ backgroundColor: cardFlipped ? 'white' : g.colour, color: cardFlipped ? g.colour : 'white' }} className={`p-4 rounded-lg transform transition-all`}>
          <div className="flex flex-grow justify-between items-center space-x-4">
            <h1 className="text-3xl font-extrabold tracking-wide mr-10">{g.name}</h1>
            <div className="flex space-x-4">
              <SquareIconButton Icon={PencilIcon} action={() => toggleEditGroupOpen()} />
              <SquareIconButton Icon={DotsVerticalIcon} action={() => toggleCardFlipped()} className={`transform transition-all duration-500 ${cardFlipped ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </div>
          <div className="flex justify-between items-end my-4">
            <div>
              {render(cardFlipped)}
            </div>
            {cardFlipped && (
              <div>
                <SquareIconButton Icon={TrashIcon} action={() => setDeleteGroupOpen(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
      <EditGroupModal editGroupOpen={editGroupOpen} toggleEditGroupOpen={toggleEditGroupOpen} groupService={groupService} g={g} />
      <DeleteDialog dialogOpen={deleteGroupOpen} toggleDialogOpen={toggleDeleteGroupOpen} itemType="group" deleteAction={() => groupService.deleteGroup(g._id)} />
    </>
  )
}

export default GroupCard;