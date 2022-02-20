export interface ISession {
  title: string,
  description: string,
  tags: string[],
  sessionDate: Date,
  createdBy?: string,
  updatedBy?: string
  updatedAt: Date,
  createdAt: Date,
  _id?: string
}