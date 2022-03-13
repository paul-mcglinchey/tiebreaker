import { IUserResponse, IUser, IUserGroup } from "../models";

export const getUserGroupInStorage = (): IUserGroup | undefined => {
  const userGroup: string | null = sessionStorage.getItem("userGroup");
  return userGroup ? JSON.parse(userGroup) : undefined;
}

export const getUsersInStorage = (): IUserResponse | undefined => {
  const users: string | null = sessionStorage.getItem("users");
  return users ? JSON.parse(users) : undefined;
}

export const getUserInStorage = (uuid: string): IUser | undefined => {
  const users = getUsersInStorage() || {};

  return Object.keys(users).includes(uuid) ? users[uuid] : undefined;
}

export const updateUsersInStorage = (uuid: string, user: any): void => {
  sessionStorage.setItem("users", JSON.stringify({ ...getUsersInStorage(), [uuid]: user }));
}