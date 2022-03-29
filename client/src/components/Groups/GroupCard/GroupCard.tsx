import { useState } from 'react';
import { CheckIcon, TrashIcon, XIcon, DotsVerticalIcon, PencilIcon } from '@heroicons/react/solid';
import { SquareIconButton } from '../..';
import { IGroup, IGroupProps } from '../../../models';
import EditGroup from '../EditGroup';
import { Transition } from '@headlessui/react';

const GroupCard = <TGroup extends IGroup>({ g, groupService, render }: IGroupProps<TGroup>) => {

  const [cardFlipped, setCardFlipped] = useState(false);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);
  const toggleEditGroupOpen = () => setEditGroupOpen(!editGroupOpen);

  return (
    <>
      <div className={`flex flex-auto min-w-120 flex-col relative h-48 mx-2 my-4 transform hover:scale-100-1/2 transition-all`}>
        <div style={{ backgroundColor: cardFlipped ? 'white' : g.colour, color: cardFlipped ? g.colour : 'white' }} className={`p-4 rounded-lg transform transition-all`}>
          <div className="flex flex-grow justify-between items-center space-x-4">
            <h1 className="text-3xl font-extrabold tracking-wide mr-10">{g.name}</h1>
            <div className="flex">
              <SquareIconButton Icon={PencilIcon} action={() => toggleEditGroupOpen()} />
              <SquareIconButton Icon={DotsVerticalIcon} action={() => toggleCardFlipped()} additionalClasses={`transform transition-all duration-500 ${cardFlipped ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </div>
          <div className="flex justify-between items-end my-4">
            <div>
              {render(cardFlipped)}
            </div>
            {cardFlipped && (
              <div>
                {!confirmingDeletion ? (
                  <SquareIconButton Icon={TrashIcon} action={() => setConfirmingDeletion(true)} />
                ) : (
                  <>
                    <SquareIconButton Icon={XIcon} action={() => setConfirmingDeletion(false)} textColor="text-red-500" />
                    <SquareIconButton Icon={CheckIcon} action={() => groupService.deleteGroup(g)} textColor="text-green-500" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Transition
        show={editGroupOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
        className="absolute w-screen h-screen inset-0 bg-gray-700/40 z-10"
      >
        <EditGroup toggleEditGroupOpen={toggleEditGroupOpen} groupService={groupService} g={g} />
      </Transition>
    </>
  )
}

export default GroupCard;