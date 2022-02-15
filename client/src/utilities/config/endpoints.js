const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/';

const endpoints = {
    "origin": BASE_URL,
    "clients": BASE_URL + "clients",
    "colours": (clientId) => BASE_URL + `clients/${clientId}/colours`,
    "sessions": (clientId) => BASE_URL + `clients/${clientId}/sessions`,
    "groups": BASE_URL + "groups",
    "groupcount": BASE_URL + "groups/count",
    "groupdefault": BASE_URL + "groups/default"
}

export default endpoints;