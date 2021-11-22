import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../config/endpoints.js';
import CustomerEntry from './ClientEntry';
import PageChanger from './PageChanger';

const ClientList = (props) => {

  const [clients, setClients] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const increasePageNumber = () => {
    (pageNumber < maxPages) && setPageNumber(pageNumber + 1);
  }
  const decreasePageNumber = () => {
    (pageNumber >= 1) && setPageNumber(pageNumber - 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const clientsresult = await axios({
        method: 'get',
        url: `${endpoints.clients}?page=${pageNumber}`
      });

      setClients(clientsresult.data.data);

      const pages = await axios({
        method: 'get',
        url: `${endpoints.pagesofclients}`
      });

      setMaxPages(pages.data.maxPagesClients)
    }
    
    setTimeout(() => {
      fetchData();
    }, 500);
    
  })

  return (
    <div>
      <div>
        {clients && clients.map((r, i) => {
          return (
            <CustomerEntry
              key={i}
              clientData={r}
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