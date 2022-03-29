import { IGroupList, IGrouplistResponse, IGroupListValue } from "../grouplist-response.model";

export interface IGrouplistItemProps {
  value: IGroupListValue,
  list: IGroupList,
  defaultGrouplists: IGrouplistResponse,
  setDefaultGrouplists: (defaultGroupList: IGrouplistResponse) => void
}