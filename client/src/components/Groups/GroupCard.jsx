import { Fragment, useState } from 'react';
import { CheckIcon, TrashIcon, XIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { endpoints, requestHelper } from '../../utilities';
import { SquareIconButton } from '..';

const GroupCard = ({ g, setRequestData, setSuccess, setIsLoading }) => {

  const [cardFlipped, setCardFlipped] = useState(false);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);

  // eslint-disable-next-line no-extend-native
  String.prototype.insert = function (index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substring(index);
    }

    return string + this;
  }

  const numberParser = num => {
    var numAsString = String(num);
    var sectors = numAsString.length <= 3 ? 0 : Math.floor(numAsString.length / 3);

    for (let i = 1; i <= sectors; i++) {
      numAsString = numAsString.insert((numAsString.length - (i * 3) - (i - 1)), ",");
    }

    return numAsString;
  }

  const deleteGroup = () => {
    setSuccess('');
    setIsLoading(true);

    fetch(endpoints.groups, requestHelper.requestBuilder("DELETE", { _id: g._id, groupname: g.groupname }))
      .then(() => {
        setSuccess(`Deleted ${g.groupname}`)
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  }

  const setDefaultGroup = () => {
    setSuccess('');
    setIsLoading(true);

    fetch(endpoints.groupdefault, requestHelper.requestBuilder("PUT", { _id: g._id, groupname: g.groupname }))
      .then(() => {
        setSuccess(`Set ${g.groupname} as the default group`);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  }

  return (
    <div className={`flex flex-auto flex-col relative h-48 mx-2 my-4 transform hover:scale-102 transition-all ${g.default && 'order-first basis-full'}`}>
      <div className={`p-4 rounded-lg transform transition-all ${cardFlipped ? 'bg-white text-blue-800' : 'bg-blue-800 text-white'}`}>
        <div className="flex flex-grow justify-between items-start space-x-4">
          <h1 className="text-3xl font-extrabold tracking-wide">{g.groupname}</h1>
          <div>
            <SquareIconButton Icon={HeartIcon} action={() => !g.default && setDefaultGroup()} additionalClasses={`${g.default ? 'fill-current' : 'fill-transparent'} hover:fill-current`}/>
            <SquareIconButton Icon={DotsVerticalIcon} action={() => toggleCardFlipped()} additionalClasses={`transform transition-all duration-500 ${cardFlipped ? 'rotate-180' : 'rotate-0'}`}/>
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
                <Fragment>
                  <SquareIconButton Icon={XIcon} action={() => setConfirmingDeletion(false)} textColor="text-red-500" />
                  <SquareIconButton Icon={CheckIcon} action={() => deleteGroup()} textColor="text-green-500" />
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupCard;