import { IGroupService } from "../../../services";

export interface IAddGroupFormProps<TGroup> {
  groupService: IGroupService<TGroup>
}