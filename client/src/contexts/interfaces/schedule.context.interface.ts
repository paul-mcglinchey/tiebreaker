import { Dispatch, SetStateAction } from "react"
import { ISchedule } from "../../models"

export interface IScheduleContext {
  getSchedules: () => ISchedule[]
  setSchedules: Dispatch<SetStateAction<ISchedule[]>>
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}