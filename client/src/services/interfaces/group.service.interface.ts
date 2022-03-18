export interface IGroupService<TGroup> {
  deleteGroup: (g: TGroup) => void,
  setDefaultGroup: (g: TGroup) => void,
  isDefaultGroup: (_id: string) => boolean,
} 