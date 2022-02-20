import { ITag } from "..";

export interface ITagFieldProps {
  name: string,
  tags: ITag[],
  setTags: (tags: ITag[]) => void,
  label: string,
  errors: any,
  touched: any
}