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

  useMountEffect(getClients);

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <div>
        {clients && clients.map(r => {
          return (
            <ClientEntry
              key={r._id}
              clientData={r}
              getClients={getClients}
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