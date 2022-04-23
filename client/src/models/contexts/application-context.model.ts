import { Dispatch, SetStateAction } from "react";

export interface IApplicationContext {
  groupId: string
  setGroupId: Dispatch<SetStateAction<string>>
}