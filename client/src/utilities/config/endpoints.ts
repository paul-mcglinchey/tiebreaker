const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';
const USERS_URL = 'https://api.userfront.com/';

export const endpoints = {
    "origin": BASE_API_URL,
    "clients": BASE_API_URL + "clients",
    "clientcolours": (clientId: string) => BASE_API_URL + `clients/${clientId}/colours`,
    "sessions": (clientId: string) => BASE_API_URL + `clients/${clientId}/sessions`,
    "clientgroups": BASE_API_URL + "clientgroups",
    "clientgroupdefault": BASE_API_URL + "clientgroups/default",
    "user": (userUuid: string) => USERS_URL + `v0/users/${userUuid}`,

    "rotagroups": BASE_API_URL + "rotagroups",
    "rotas": BASE_API_URL + "rotas",
    "employees": BASE_API_URL + "employees",

    "grouplists": BASE_API_URL + "grouplists"
}