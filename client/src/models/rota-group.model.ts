export interface IRotaGroup {
  groupName: string,
  default: boolean,
  accessControl: {
    [key: string]: string[]
  },
  employees: string[],
  rotas: string[],
  listDefinitions: string,
  groupColour: string
}