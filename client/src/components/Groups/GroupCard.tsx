import { useContext, useState } from 'react';
import { CheckIcon, TrashIcon, XIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { SquareIconButton } from '..';
import { ApplicationContext, endpoints } from '../../utilities';
import { requestBuilder } from '../../services';
import { IGroupProps } from '../../models';
import { Status } from '../../models/types/status.type';

const GroupCard = ({ g }: IGroupProps) => {

  const { status, setStatus } = useContext(ApplicationContext);

  const [cardFlipped, setCardFlipped] = useState(false);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);

  // eslint-disable-next-line no-extend-native
  const stringInsert = function (this: any, index: number, string: string): string {
    if (index > 0) {
      return this.substring(0, index) + string + this.substring(index);
    }

    return string + this;
  }

  const numberParser = (num: number) => {
    var numAsString: string = num.toString();
    var sectors: number = numAsString.length <= 3 ? 0 : Math.floor(numAsString.length / 3);

    for (let i: number = 1; i <= sectors; i++) {
      numAsString = stringInsert((numAsString.length - (i * 3) - (i - 1)), ",");
    }

    return numAsString;
  }

  const deleteGroup = () => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    if (g.default) {
      setStatus([...status, {
        isLoading: false,
        message: 'Cannot delete the default group',
        type: Status.Error
      }])

      return;
    }

    fetch(endpoints.groups, requestBuilder("DELETE", undefined, { _id: g._id, groupName: g.groupName }))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Successfully deleted ${g.groupName}`, type: Status.Success }])
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred deleting ${g.groupName}`, type: Status.Error }])
        }
      })
      .catch(() => {
        setStatus([...status, { isLoading: false, message: '', type: Status.None }])
      })
  }

  const setDefaultGroup = () => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    fetch(endpoints.groupdefault, requestBuilder("PUT", undefined, { _id: g._id, groupName: g.groupName }))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Successfully set default group`, type: Status.Success }])
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred setting default group`, type: Status.Error }])
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        setStatus([...status, { isLoading: false, message: '', type: Status.None }])
      })
  }

  return (
    <div className={`flex flex-auto min-w-120 flex-col relative h-48 mx-2 my-4 transform hover:scale-102 transition-all ${g.default && 'order-first'}`}>
      <div className={`p-4 rounded-lg transform transition-all ${cardFlipped ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
        <div className="flex flex-grow justify-between items-center space-x-4">
          <h1 className="text-3xl font-extrabold tracking-wide mr-10">{g.groupName}</h1>
          <div className="flex">
            <SquareIconButton Icon={HeartIcon} action={() => !g.default && setDefaultGroup()} additionalClasses={`${g.default ? 'fill-current' : 'fill-transparent'} hover:fill-current`} />
            <SquareIconButton Icon={DotsVerticalIcon} action={() => toggleCardFlipped()} additionalClasses={`transform transition-all duration-500 ${cardFlipped ? 'rotate-180' : 'rotate-0'}`} />
          </div>
        </div>
        <div className="flex justify-between items-end my-4">
          <div>
            <span className="text-8xl font-bold">{cardFlipped ? numberParser(g.users.length) : numberParser(g.clients.length)}</span>
            <span className="font-bold text-gray-400">{cardFlipped ? 'users' : 'clients'}</span>
          </div>
          {cardFlipped && (
            <div>
              {!confirmingDeletion ? (
                <SquareIconButton Icon={TrashIcon} action={() => setConfirmingDeletion(true)} />
              ) : (
                <>
                  <SquareIconButton Icon={XIcon} action={() => setConfirmingDeletion(false)} textColor="text-red-500" />
                  <SquareIconButton Icon={CheckIcon} action={() => deleteGroup()} textColor="text-green-500" />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupCard;