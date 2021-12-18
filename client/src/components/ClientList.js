import { useMountEffect } from '../helpers/useMountEffect';
import ClientEntry from './ClientEntry';
import PageChanger from './PageChanger';

const ClientList = (props) => {

  const { pageNumber, maxPages, clients, setPageNumber, getClients, userGroup, addSessionOpen, toggleAddSession } = props;

  const increasePageNumber = () => {
    (pageNumber < maxPages) && setPageNumber(pageNumber + 1);
  }
  const decreasePageNumber = () => {
    (pageNumber >= 1) && setPageNumber(pageNumber - 1);
  }

  return (
    <div className="bg-gray-800 rounded-lg p-2 text-white">
      <div>
        {clients && clients.map(r => {
          return (
            <ClientEntry
              key={r._id}
              clientData={r}
              userGroup={userGroup}
              addSessionOpen={addSessionOpen}
              toggleAddSession={toggleAddSession}
            />
          )
        })}
      </div>
      <div>
        {clients &&
          <PageChanger pageNumber={pageNumber} decreasePageNumber={() => decreasePageNumber} increasePageNumber={() => increasePageNumber} />
        }
      </div>
    </div>
  )
}

export default ClientList;