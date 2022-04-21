import { ITag } from "./tag.model"

export interface ISession {
  title?: string,
  description?: string,
  tags: ITag[],
  sessionDate?: string,
  createdBy?: string,
  updatedBy?: string
  updatedAt?: Date,
  createdAt?: Date,
  _id?: string
}