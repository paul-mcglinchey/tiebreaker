const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';
const USERS_URL = 'https://api.userfront.com/';

export const endpoints = {
    "origin": BASE_API_URL,
    "clients": BASE_API_URL + "clients",
    "clientcolours": (clientId: string) => BASE_API_URL + `clients/${clientId}/colours`,
    "sessions": (clientId: string) => BASE_API_URL + `clients/${clientId}/sessions`,
    "user": (userUuid: string) => USERS_URL + `v0/users/${userUuid}`,
    "rotas": BASE_API_URL + "rotas",
    "employees": BASE_API_URL + "employees",

    groups: (groupType: string) => {
        return {
            groups: BASE_API_URL + groupType + "groups",
            default: BASE_API_URL + `users/defaultgroup/${groupType}`
        }
    },
    "currentuser": BASE_API_URL + "users/current",
    
    "grouplists": (listId: string) => BASE_API_URL + `grouplists/${listId}`,
    "defaultgrouplists": BASE_API_URL + "grouplists/default"
}