import { useState } from 'react';
import { useFetch } from '../hooks';
import AddFirstClient from './AddFirstClient';
import ClientEntry from './ClientEntry';
import PageChanger from './PageChanger';

const ClientList = (props) => {

  const {
    pageNumber,
    setPageNumber,
    maxPages,
    clients,
    userGroup,
    update
  } = props;

  const increasePageNumber = () => {
    (pageNumber < maxPages) && setPageNumber(pageNumber + 1);
  }
  const decreasePageNumber = () => {
    (pageNumber >= 1) && setPageNumber(pageNumber - 1);
  }

  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  return (
    clients && clients.length > 0 ? (
      <div className="bg-gray-800 rounded-lg p-2 text-white" >
        <div>
          {clients && clients.length > 0 && clients.map(c => {
            return (
              <ClientEntry
                key={c._id}
                clientData={c}
                userGroup={userGroup}
                addSessionOpen={addSessionOpen}
                toggleAddSession={toggleAddSession}
                update={update}
              />
            )
          })}
        </div>
        <div>
          {clients &&
            <PageChanger pageNumber={pageNumber} decreasePageNumber={() => decreasePageNumber} increasePageNumber={() => increasePageNumber} />
          }
        </div>
      </div >
    ) : (
      <AddFirstClient />
    )

  )
}

export default ClientList;