export interface IUserResponse {
  mode: string,
  userId: number,
  tenantId: string,
  userUuid: string,
  username: string,
  email: string,
  name: string,
  image: string,
  locked: boolean,
  data: {
    defaultClientGroup?: string,
    defaultRotaGroup?: string,
    [key: string]: string
  },
  isConfirmed: boolean,
  lastActiveAt: string,
  lastMessagedAt: string,
  confirmedAt: string,
  createdAt: string,
  updatedAt: string,
  tenant: {
    tenantId: string,
    name: string
  },
  authorization: {
    [key: string]: {
      roles: string[]
    }
  }
}