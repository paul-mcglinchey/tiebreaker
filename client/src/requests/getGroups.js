import endpoints from "../config/endpoints";
import { requestBuilder } from "../helpers/requestService";

const getGroups = (setGroups, userGroup, setUserGroup, setGroupsLoading) => {

  setGroupsLoading(true);

  fetch(endpoints.groups, requestBuilder("GET"))
    .then(response => response.json())
    .then((data) => {
      setGroups(data.groups);
      if (!userGroup) {
        setUserGroup(data.groups[0].groupname);
      }
      setGroupsLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
      setGroupsLoading(false);
    })
}

export default getGroups;