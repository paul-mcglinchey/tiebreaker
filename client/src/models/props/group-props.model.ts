import { IGroupService } from "../../services/interfaces";

export interface IGroupProps<TGroup> {
  g: TGroup,
  groupService: IGroupService<TGroup>,
  render: (isCardFlipped: boolean) => JSX.Element
}