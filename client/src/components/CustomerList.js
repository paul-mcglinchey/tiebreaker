import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../config/endpoints.js';
import CustomerEntry from './CustomerEntry';
import PageChanger from './PageChanger';

const CustomerList = (props) => {

  const [customers, setCustomers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const increasePageNumber = () => {
    setPageNumber(pageNumber + 1);
  }
  const decreasePageNumber = () => {
    (pageNumber >= 1) && setPageNumber(pageNumber - 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: `${endpoints.customers}?page=${pageNumber}`

      });

      setCustomers(result.data.data);
    }

    fetchData();
  }, [pageNumber])

  return (
    <div>
      <div>
        {customers && customers.map((r, i) => {
          return (
            <CustomerEntry key={i} name={r.name} email={r.email} />
          )
        })}
      </div>
      <div>
        <PageChanger pageNumber={pageNumber} decreasePageNumber={() => decreasePageNumber} increasePageNumber={() => increasePageNumber} />
      </div>
    </div>
  )
}

export default CustomerList;