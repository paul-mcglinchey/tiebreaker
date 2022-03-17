import { IGroup } from "../group.model";

export interface IGroupSelectorProps<TGroup extends IGroup> {
  group: TGroup,
  setGroup: (group: TGroup) => void,
  groups: TGroup[],
  storageKey: string
}