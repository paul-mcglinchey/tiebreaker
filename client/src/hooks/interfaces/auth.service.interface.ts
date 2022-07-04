import { IAuthContext } from "../../contexts/interfaces";
import { Permission } from "../../enums";
import { IPreferences, IUser } from "../../models";

export interface IAuthService extends IAuthContext {
  login: (user: IUser) => void
  signup: (user: IUser) => void
  logout: () => void
  hasPermission: (applicationIdentifier: number, permission: Permission) => boolean
  updatePreferences: (values: IPreferences) => void
}