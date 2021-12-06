import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';

const getGroups = (setGroups, userGroup, setUserGroup) => {
  fetch(endpoints.getgroups, {
    mode: 'cors',
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Userfront.tokens.accessToken}`
    }
  })
    .then(response => response.json())
    .then((data) => {
      setGroups(data.groups);
      if (!userGroup) {
        setUserGroup(data.groups[0].groupname);
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
}

export default getGroups;