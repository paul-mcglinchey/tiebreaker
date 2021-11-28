import { useMountEffect } from '../helpers/useMountEffect';
import ClientEntry from './ClientEntry';
import PageChanger from './PageChanger';

const ClientList = (props) => {

  const { pageNumber, maxPages, clients, setPageNumber, getClients, userGroup } = props;
  
  const increasePageNumber = () => {
    (pageNumber < maxPages) && setPageNumber(pageNumber + 1);
  }
  const decreasePageNumber = () => {
    (pageNumber >= 1) && setPageNumber(pageNumber - 1);
  }

  useMountEffect(getClients, [userGroup]);

  return (
    <div>
      <div>
        {clients && clients.map(r => {
          return (
            <ClientEntry
              key={r._id}
              clientData={r}
              getClients={getClients}
              userGroup={userGroup}
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