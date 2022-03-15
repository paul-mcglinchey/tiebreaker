const BASE_CLIENTS_URL = process.env['REACT_APP_CLIENTS_API_URL'] || 'http://localhost:3001/api/';
const BASE_ROTAS_URL = process.env['REACT_APP_ROTAS_API_URL'] || 'http://localhost:3002/api/';
const USERS_URL = 'https://api.userfront.com/';

export const endpoints = {
    "origin": BASE_CLIENTS_URL,
    "clients": BASE_CLIENTS_URL + "clients",
    "colours": (clientId: string) => BASE_CLIENTS_URL + `clients/${clientId}/colours`,
    "sessions": (clientId: string) => BASE_CLIENTS_URL + `clients/${clientId}/sessions`,
    "groups": BASE_CLIENTS_URL + "groups",
    "groupdefault": BASE_CLIENTS_URL + "groups/default",
    "user": (userUuid: string) => USERS_URL + `v0/users/${userUuid}`,

    "rotagroups": BASE_ROTAS_URL + "rotagroups",
    "rotas": BASE_ROTAS_URL + "rotas",
    "employees": BASE_ROTAS_URL + "employees",
}