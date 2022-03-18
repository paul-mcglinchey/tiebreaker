import { IGroupService } from "../../services";

export interface IGroupProps<TGroup> {
  g: TGroup,
  groupService: IGroupService<TGroup>
}