import { useContext, useState } from 'react';
import { CheckIcon, TrashIcon, XIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { SquareIconButton } from '..';
import { endpoints, StatusContext } from '../../utilities';
import { requestBuilder } from '../../services';
import { IGroup, IGroupProps, IUserResponseModel, Status } from '../../models';
import { useFetch } from '../../hooks';

const GroupCard = <TGroup extends IGroup>({ g }: IGroupProps<TGroup>) => {

  const { status, setStatus } = useContext(StatusContext);

  const [cardFlipped, setCardFlipped] = useState(false);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const currentUser = useFetch<IUserResponseModel>(endpoints.clientgroupdefault, requestBuilder("GET")).response;
  const isDefaultGroup: boolean = currentUser?.data.defaultClientGroup === g._id;

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);

  const stringInsert = function (this: any, index: number, string: string): string {
    if (index > 0) {
      return this.substring(0, index) + string + this.substring(index);
    }

    return string + this;
  }

  const getTotalUsers = (accessControl: { [key: string]: string[] }): number => {
    const distinctUsers: string[] = [];

    Object.keys(accessControl).forEach((key: string) => {
      accessControl[key]?.forEach((userId: string) => !distinctUsers.includes(userId) && distinctUsers.push(userId));
    });

    return distinctUsers.length;
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

    if (isDefaultGroup) {
      setStatus([...status, {
        isLoading: false,
        message: 'Cannot delete the default group',
        type: Status.Error
      }])

      return;
    }

    fetch(endpoints.clientgroups, requestBuilder("DELETE", undefined, { _id: g._id, groupName: g.groupName }))
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

    fetch(endpoints.clientgroupdefault, requestBuilder("PUT", undefined, { _id: g._id, groupName: g.groupName }))
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
    <div className={`flex flex-auto min-w-120 flex-col relative h-48 mx-2 my-4 transform hover:scale-102 transition-all ${isDefaultGroup && 'order-first'}`}>
      <div className={`p-4 rounded-lg transform transition-all ${cardFlipped ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
        <div className="flex flex-grow justify-between items-center space-x-4">
          <h1 className="text-3xl font-extrabold tracking-wide mr-10">{g.groupName}</h1>
          <div className="flex">
            <SquareIconButton Icon={HeartIcon} action={() => !isDefaultGroup && setDefaultGroup()} additionalClasses={`${isDefaultGroup ? 'fill-current' : 'fill-transparent'} hover:fill-current`} />
            <SquareIconButton Icon={DotsVerticalIcon} action={() => toggleCardFlipped()} additionalClasses={`transform transition-all duration-500 ${cardFlipped ? 'rotate-180' : 'rotate-0'}`} />
          </div>
        </div>
        <div className="flex justify-between items-end my-4">
          <div>
            <span className="text-8xl font-bold">{cardFlipped ? numberParser(getTotalUsers(g.accessControl)) : numberParser(g.listDefinitions.length)}</span>
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