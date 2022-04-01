import { Task } from './types/task.type';

export interface IActivityLog {
  task: Task,
  actor: string,
  updatedAt: string,
  createdAt: string,
  _id?: string
}