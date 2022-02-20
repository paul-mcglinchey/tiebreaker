import { IStatus } from "..";

export interface IDeleteClientProps {
  groupName: string,
  isDeleteClientOpen: boolean,
  toggleDeleteClientOpen: () => void,
  setStatus: (status: IStatus) => void
}