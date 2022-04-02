const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';
const USERS_URL = 'https://api.userfront.com/';

export const endpoints = {
    "origin": BASE_API_URL,
    "clients": BASE_API_URL + "clients",
    "clientcolours": (clientId: string) => BASE_API_URL + `clients/${clientId}/colours`,
    "sessions": (clientId: string) => BASE_API_URL + `clients/${clientId}/sessions`,
    "user": (userUuid: string) => USERS_URL + `v0/users/${userUuid}`,
    "rota": (rotaId: string = "") => BASE_API_URL + `rotas/` + rotaId,
    "rotas": (groupId: string) => BASE_API_URL + `rotas?groupId=${groupId}`,
    "schedules": (rotaId: string, startDate: Date | undefined) => BASE_API_URL + `rotas/${rotaId}/schedules${startDate ? '/' + startDate?.toISOString().split("T")[0] : ''}`,
    "employees": (groupId: string) => BASE_API_URL + `employees?groupId=${groupId}`,

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