const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "origin": BASE_URL,
    "clients": BASE_URL + "clients",
    "pagesofclients": BASE_URL + "clients/pagesofclients",
    "addsession": BASE_URL + "clients/sessions",
    "groups": BASE_URL + "groups",
    "groupcount": BASE_URL + "groups/count",
    "creategroup": BASE_URL + "groups",
}

export default endpoints;