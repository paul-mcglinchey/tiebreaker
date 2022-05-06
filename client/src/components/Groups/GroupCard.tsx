import { useState } from 'react';
import { TrashIcon, DotsVerticalIcon, PencilIcon } from '@heroicons/react/solid';
import { IGroup } from '../../models';
import { useGroupService } from '../../hooks';
import { Dialog, SquareIconButton } from '../Common';
import { EditGroupModal } from '.';

interface IGroupProps {
  g: IGroup,
  render: (isCardFlipped: boolean) => JSX.Element
}

const GroupCard = ({ g, render }: IGroupProps) => {

  const [cardFlipped, setCardFlipped] = useState(false);
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);

  const { deleteGroup } = useGroupService()

  return (
    <>
      <div className={`flex flex-auto min-w-120 flex-col relative md:h-48 mx-2 my-4 transform hover:scale-100-1/2 transition-all`}>
        <div style={{ backgroundColor: cardFlipped ? 'white' : g.colour, color: cardFlipped ? g.colour : 'white' }} className={`p-4 rounded-lg transform transition-all`}>
          <div className="flex flex-grow justify-between items-center space-x-4">
            <h1 className="text-3xl font-extrabold tracking-wide mr-10">{g.name}</h1>
            <div className="flex space-x-4">
              <SquareIconButton Icon={PencilIcon} action={() => setEditGroupOpen(true)} />
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
      <EditGroupModal isOpen={editGroupOpen} close={() => setEditGroupOpen(false)} group={g} />
      <Dialog 
        isOpen={deleteGroupOpen} 
        close={() => setDeleteGroupOpen(false)}
        positiveActions={[() => deleteGroup(g._id), () => setEditGroupOpen(false)]} 
        title="Delete group"
        description="This action will delete the group for all users"
        content="If you choose to continue you and all other users of this group will no longer have access to it or any of it's application data"
      />
    </>
  )
}

export default GroupCard;