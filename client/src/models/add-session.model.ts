export interface IAddSession {
  title: string,
  description: string,
  sessionDate: string | undefined,
  createdBy: string,
  tags?: string[]
}