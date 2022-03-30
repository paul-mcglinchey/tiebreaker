import React from "react";
import { IGroupList, IGrouplistResponse, IGroupListValue } from "../grouplist-response.model";

export interface IGrouplistItemProps {
  value: IGroupListValue,
  list: IGroupList,
  defaultGrouplists: IGrouplistResponse,
  setDefaultGrouplists: (defaultGroupLists: React.SetStateAction<IGrouplistResponse>) => void
}