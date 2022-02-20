const BASE_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';
const USERS_URL = 'https://api.userfront.com/';

export const endpoints = {
    "origin": BASE_URL,
    "clients": BASE_URL + "clients",
    "colours": (clientId: string) => BASE_URL + `clients/${clientId}/colours`,
    "sessions": (clientId: string) => BASE_URL + `clients/${clientId}/sessions`,
    "groups": BASE_URL + "groups",
    "groupcount": BASE_URL + "groups/count",
    "groupdefault": BASE_URL + "groups/default",
    "user": (userUuid: string) => USERS_URL + `v0/users/${userUuid}`,
}