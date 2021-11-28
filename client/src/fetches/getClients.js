import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';

const getClients = (groupname, setMaxPages, pageNumber, setClients) => {
    fetch(`${endpoints.pagesofclients}?groupname=${groupname}`, {
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

    fetch(`${endpoints.clients}?page=${pageNumber}&groupname=${groupname}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      }
    })
      .then(response => response.json())
      .then(clients => {
        console.log(clients);
        setClients(clients.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

export default getClients;