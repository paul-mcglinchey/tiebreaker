import { Navigate } from "react-router"
import { Permission } from "../enums"
import { useAuthService } from "../hooks"

interface IRestrictedRouteProps {
  applicationIdentifier: number
  permission: Permission
  component: JSX.Element
  redirect?: string
}

const RestrictedRoute = ({ applicationIdentifier , permission, component, redirect = "/notpermitted" }: IRestrictedRouteProps): JSX.Element => {
  const { hasPermission } = useAuthService()

  return hasPermission(applicationIdentifier, permission) ? component : <Navigate to={redirect} />
}

export default RestrictedRoute