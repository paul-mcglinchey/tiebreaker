import endpoints from "../config/endpoints";
import { requestBuilder } from "../helpers/requestService";

const getGroups = (setGroups, userGroup, setUserGroup) => {
  fetch(endpoints.groups, requestBuilder("GET"))
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