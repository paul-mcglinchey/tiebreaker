import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';

const getClients = (userGroup, setMaxPages, pageNumber, setClients) => {
  const fetchClients = () => {
    fetch(`${endpoints.pagesofclients}?userGroup=${userGroup}`, {
      credentials: 'include',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      }
    })
      .then(response => response.json())
      .then(pages => {
        setMaxPages(pages.maxPagesClients)
      })
      .catch(err => {
        console.log(err);
      })

    fetch(`${endpoints.clients}?page=${pageNumber}&userGroup=${userGroup}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      }
    })
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