export interface IAuthorization {
  [key: string]: {
    name: string,
    permissions: any[],
    roles: string[]
  }
}