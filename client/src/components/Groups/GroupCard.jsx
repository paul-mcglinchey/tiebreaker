import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import endpoints from '../../config/endpoints';
import { requestHelper } from '../../helpers';

const GroupCard = props => {
  const {
    g
  } = props;

  const [cardFlipped, setCardFlipped] = useState(false);
  const toggleCardFlipped = () => setCardFlipped(!cardFlipped);

  const deleteGroup = () => {
    requestHelper.requestMaker(endpoints.groups, 'DELETE', { _id: g._id, groupname: g.groupname });
  }

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

  return (
    <div onClick={() => toggleCardFlipped()} className="flex flex-auto flex-col relative h-48 m-2 transform hover:scale-102 transition-all">
      <div className={`px-6 pt-6 bg-purple-brand text-white rounded-lg transform transition-all ${cardFlipped ? 'scale-y-0' : 'scale-y-100'}`}>
        <div className="flex-grow">
          <h1 className="text-3xl font-extrabold tracking-wide">{g.groupname}</h1>
        </div>
        <div className="my-4">
          <span className="text-8xl font-bold">{numberParser(g.clients.length)}</span>
          <span className="font-bold text-gray-400">clients</span>
        </div>
      </div>
      <div className={`px-6 pt-6 bg-white text-purple-brand rounded-lg top-0 left-0 absolute w-full h-full transition-all transform ${cardFlipped ? 'scale-y-100' : 'scale-y-0'}`}>
        <div className="flex-grow">
          <h1 className="text-3xl font-extrabold tracking-wide">{g.groupname}</h1>
        </div>
        <div className="flex my-4 justify-between items-end">
          <div className="">
            <span className="text-8xl font-bold">{numberParser(g.users.length)}</span>
            <span className="font-bold text-gray-400">users</span>
          </div>
          <div>
            <button onClick={() => deleteGroup()} className="p-2 rounded-lg bg-gray-100 shadow-sm">
              <XIcon className="text-red-600 h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupCard;