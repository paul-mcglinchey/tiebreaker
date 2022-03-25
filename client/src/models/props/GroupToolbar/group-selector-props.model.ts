export interface IGroupSelectorProps<TGroup> {
  groupType: string,
  group: TGroup,
  setGroup: (group: TGroup) => void,
  groups: TGroup[] 
}