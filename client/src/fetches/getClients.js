import endpoints from "../config/endpoints";
import { requestBuilder } from '../helpers/requestBuilder';

const getClients = (userGroup, setMaxPages, pageNumber, setClients) => {
  const fetchClients = () => {
    fetch(`${endpoints.pagesofclients}?userGroup=${userGroup}`, requestBuilder("GET"))
      .then(response => response.json())
      .then(pages => {
        setMaxPages(pages.maxPagesClients)
      })
      .catch(err => {
        console.log(err);
      })

    fetch(`${endpoints.clients}?page=${pageNumber}&userGroup=${userGroup}`, requestBuilder("GET"))
      .then(response => response.json())
      .then(clients => {
        setClients(clients.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return fetchClients;
}

export default getClients;