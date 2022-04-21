import { GroupType } from "../../models";

const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';

export const endpoints = {
    "origin"    : BASE_API_URL,

    "login"     : BASE_API_URL + `users/login`,
    "signup"    : BASE_API_URL + `users/signup`,

    "clients"   : (groupId: string) => BASE_API_URL + `clientgroups/${groupId}/clients`,
    "client"    : (clientId: string, groupId: string) => BASE_API_URL + `clientgroups/${groupId}/clients/${clientId}`, 
    "sessions"  : (clientId: string, groupId: string) => BASE_API_URL + `clientgroups/${groupId}/clients/${clientId}/sessions`,
    "session"   : (clientId: string, groupId: string, sessionId: string) => BASE_API_URL + `clientgroups/${groupId}/clients/${clientId}/sessions/${sessionId}`,
    
    "rotas"     : (groupId: string) => BASE_API_URL + `rotagroups/${groupId}/rotas`,
    "rota"      : (rotaId: string, groupId: string) => BASE_API_URL + `rotagroups/${groupId}/rotas/${rotaId}`,
    "schedules" : (rotaId: string, groupId: string) => BASE_API_URL + `rotagroups/${groupId}/rotas/${rotaId}/schedules`,
    "schedule"  : (rotaId: string, groupId: string, startDate: string) => BASE_API_URL + `rotagroups/${groupId}/rotas/${rotaId}/schedules/${startDate}`,
    "employees" : (groupId: string) => BASE_API_URL + `employees?groupId=${groupId}`,
    "employee"  : (employeeId: string) => BASE_API_URL + `employees/${employeeId}`,
    
    groups      : (groupType: GroupType) => {
        return {
            group   : (groupId: string) => BASE_API_URL + `${groupType}groups/${groupId}`,
            groups  : BASE_API_URL + `${groupType}groups`
        }
    },
    
    "user"          : (userId: string) => BASE_API_URL + `users/${userId}`,
    "currentuser"   : BASE_API_URL + "users/current",
    
    "grouplist"         : (listId: string) => BASE_API_URL + `grouplists/${listId}`,
    "defaultgrouplists" : BASE_API_URL + "grouplists/default"
}