const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';

export const endpoints = {
    "origin"    : BASE_API_URL,

    "login"         : BASE_API_URL + `users/login`,
    "signup"        : BASE_API_URL + `users/signup`,
    "authenticate"  : BASE_API_URL + `users/authenticate`,

    "groups"    : BASE_API_URL + 'groups',
    "group"     : (groupId: string) => BASE_API_URL + `groups/${groupId}`,    

    "clients"   : (groupId: string) => BASE_API_URL + `groups/${groupId}/clients`,
    "client"    : (clientId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}`, 
    
    "sessions"  : (clientId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}/sessions`,
    "session"   : (clientId: string, groupId: string, sessionId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}/sessions/${sessionId}`,
    
    "rotas"     : (groupId: string) => BASE_API_URL + `groups/${groupId}/rotas`,
    "rota"      : (rotaId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}`,
    
    "schedules" : (rotaId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}/schedules`,
    "schedule"  : (rotaId: string, groupId: string, scheduleId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}/schedules/${scheduleId}`,

    "employees" : (groupId: string) => BASE_API_URL + `groups/${groupId}/employees`,
    "employee"  : (employeeId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/employees/${employeeId}`,
    
    "user"          : (userId: string) => BASE_API_URL + `users/${userId}`,
    "groupusers"    : (groupId: string) => BASE_API_URL + `groups/${groupId}/users`,
    "currentuser"   : BASE_API_URL + "users/current",
    
    "systemlistcollection"  : (listcollectionId: string) => BASE_API_URL + `listcollections/system/${listcollectionId}`,
    "systemlistcollections" : BASE_API_URL + "listcollections/system",

    "permission"            : (permissionId: string) => BASE_API_URL + `permissions/${permissionId}`,
    "permissions"           : BASE_API_URL + "permissions"
}