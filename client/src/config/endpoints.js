const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "origin": BASE_URL,
    "clients": BASE_URL + "clients",
    "pagesofclients": BASE_URL + "clients/pagesofclients",
    "deleteclient": BASE_URL + "clients/deleteclient",
    "addsession": BASE_URL + "clients/sessions",
    "configureuser": BASE_URL + "configureuser",
    "creategroup": BASE_URL + "users/creategroup",
    "getgroups": BASE_URL + "users/groups"
}

export default endpoints;