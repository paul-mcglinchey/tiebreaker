import { Task } from './types/task.type';

export interface IActivityLog {
  task: Task,
  actor: string,
  updatedAt: Date,
  createdAt: Date,
  _id?: string
}