const BASE_API_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:3001/api/';

export const endpoints = {
    "origin"    : BASE_API_URL,

    "login"         : BASE_API_URL + `users/login`,
    "signup"        : BASE_API_URL + `users/signup`,
    "authenticate"  : BASE_API_URL + `users/authenticate`,

    "groups"    : BASE_API_URL + 'groups',
    "allgroups" : BASE_API_URL + 'groups/all',
    "group"     : (groupId: string) => BASE_API_URL + `groups/${groupId}`, 
    
    "applications": BASE_API_URL + `applications`,
    "application": (applicationId: string) => BASE_API_URL + `applications/${applicationId}`,

    "clients"   : (groupId: string, includeDeleted?: boolean) => BASE_API_URL + `groups/${groupId}/clients${includeDeleted ? '/deleted' : ''}`,
    "client"    : (clientId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}`, 
    
    "sessions"  : (clientId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}/sessions`,
    "session"   : (clientId: string, groupId: string, sessionId: string) => BASE_API_URL + `groups/${groupId}/clients/${clientId}/sessions/${sessionId}`,
    
    "rotas"     : (groupId: string, includeDeleted?: boolean) => BASE_API_URL + `groups/${groupId}/rotas${includeDeleted ? '/deleted' : ''}`,
    "rota"      : (rotaId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}`,
    
    "schedules" : (rotaId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}/schedules`,
    "schedule"  : (rotaId: string, groupId: string, scheduleId: string) => BASE_API_URL + `groups/${groupId}/rotas/${rotaId}/schedules/${scheduleId}`,

    "employees" : (groupId: string, includeDeleted?: boolean) => BASE_API_URL + `groups/${groupId}/employees${includeDeleted ? '/deleted' : ''}`,
    "employee"  : (employeeId: string, groupId: string) => BASE_API_URL + `groups/${groupId}/employees/${employeeId}`,
    
    "user"          : (userId: string) => BASE_API_URL + `users/${userId}`,
    "groupusers"    : (groupId: string) => BASE_API_URL + `groups/${groupId}/users`,
    "currentuser"   : BASE_API_URL + "users/current",
    
    "systemlistcollection"  : (listcollectionId: string) => BASE_API_URL + `listcollections/system/${listcollectionId}`,
    "systemlistcollections" : BASE_API_URL + "listcollections/system",

    "permissions"           : BASE_API_URL + "permissions",
    "permission"            : (permissionId: string) => BASE_API_URL + `permissions/${permissionId}`,
}