const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "clients": BASE_URL + "clients",
    "pagesofclients": BASE_URL + "clients/pagesofclients",
    "deleteclient": BASE_URL + "clients/deleteclient",
    "addsession": BASE_URL + "clients/sessions"
}

export default endpoints;