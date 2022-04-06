import { GroupType } from "../../models";

const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';

export const endpoints = {
    "origin": BASE_API_URL,
    "clients": (groupId: string) => BASE_API_URL + `clients?groupId=${groupId}`,
    "client": (clientId: string, groupId?: string) => BASE_API_URL + `clients/${clientId}${groupId ? ('?groupId=' + groupId) : ''}`, 
    "sessions": (clientId: string) => BASE_API_URL + `clients/${clientId}/sessions`,
    "rotas": (groupId: string) => BASE_API_URL + `rotas?groupId=${groupId}`,
    "rota": (rotaId: string, groupId?: string) => BASE_API_URL + `rotas/${rotaId}${groupId ? ('?groupId=' + groupId) : ''}`,
    "schedule": (rotaId: string, startDate: string) => BASE_API_URL +  `rotas/${rotaId}/schedules/${startDate}`,
    "employees": (groupId: string) => BASE_API_URL + `employees?groupId=${groupId}`,
    "employee": (employeeId: string) => BASE_API_URL + `employees/${employeeId}`,
    groups: (groupType: GroupType) => {
        return {
            groups: BASE_API_URL + `${groupType}groups`
        }
    },
    "user": (userId: string) => BASE_API_URL + `users/${userId}`,
    "currentuser": BASE_API_URL + "users/current",
    
    "grouplist": (listId: string) => BASE_API_URL + `grouplists/${listId}`,
    "defaultgrouplists": BASE_API_URL + "grouplists/default"
}