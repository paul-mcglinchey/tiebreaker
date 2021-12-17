import endpoints from "../config/endpoints";
import { requestBuilder } from '../helpers/requestService';

const getClients = (userGroup, setMaxPages, pageNumber, setClients, setClientsLoading) => {
  const fetchClients = () => {

    setClientsLoading(true);

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
        setClientsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setClientsLoading(false);
      })
  }

  return fetchClients;
}

export default getClients;