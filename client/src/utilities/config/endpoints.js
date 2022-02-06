const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "origin": BASE_URL,
    "clients": BASE_URL + "clients",
    "pagesofclients": BASE_URL + "clients/pagesofclients",
    "sessions": BASE_URL + "clients/sessions",
    "groups": BASE_URL + "groups",
    "groupcount": BASE_URL + "groups/count",
    "groupdefault": BASE_URL + "groups/default"
}

export default endpoints;