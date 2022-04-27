import { ISchedule } from ".."

export interface IScheduleContext {
  getSchedules: () => ISchedule[]
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}